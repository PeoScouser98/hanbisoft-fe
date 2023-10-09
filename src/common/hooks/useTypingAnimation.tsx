import { useCallback, useEffect, useState } from 'react';

enum TypePhase {
	Typing,
	Pausing,
	Deleting
}

const TYPING_INTERVAL_MIN = 50;
const TYPING_INTERVAL_MAX = 50;
const TYPING_PAUSE_MS = 2000;
const DELETING_INTERVAL = 50;
const DELETING_PAUSE_MS = 1000;

const getRandomTypingInterval = () =>
	Math.floor(Math.random() * (TYPING_INTERVAL_MAX - TYPING_INTERVAL_MIN + 1)) + TYPING_INTERVAL_MIN;

export const useTypingAnimation = (
	phases: string[],
	options?: { repeat: boolean }
): {
	typedPhase: string;
	selectedPhase: string;
	phase: TypePhase;
	resume: () => void;
} => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [phase, setPhase] = useState(TypePhase.Typing);
	const [typedSuperpower, setTypedSuperpower] = useState('');
	const resume = useCallback(() => {
		if (phase !== TypePhase.Pausing) return;
		setPhase(TypePhase.Deleting);
	}, [phase]);

	useEffect(() => {
		switch (phase) {
			case TypePhase.Typing: {
				const nextTypedSuperPower = phases[selectedIndex].slice(0, typedSuperpower.length + 1);

				if (nextTypedSuperPower === typedSuperpower) {
					setPhase(TypePhase.Pausing);
					return;
				}

				const timeout = setTimeout(() => {
					setTypedSuperpower(nextTypedSuperPower);
				}, getRandomTypingInterval());

				return () => clearTimeout(timeout);
			}
			case TypePhase.Deleting: {
				if (!typedSuperpower) {
					const timeout = setTimeout(() => {
						const nextIndex = selectedIndex + 1;
						setSelectedIndex(phases[nextIndex] ? nextIndex : 0);

						setPhase(TypePhase.Typing);
					}, DELETING_PAUSE_MS);
					return () => clearTimeout(timeout);
				}

				const nextRemaining = phases[selectedIndex].slice(0, typedSuperpower.length - 1);
				const timeout = setTimeout(() => {
					setTypedSuperpower(nextRemaining);
				}, DELETING_INTERVAL);

				return () => clearTimeout(timeout);
			}
			case TypePhase.Pausing:
				const timeout = setTimeout(() => {
					if (options.repeat || selectedIndex < phases.length - 1) {
						setPhase(TypePhase.Deleting);
					} else {
						setPhase(TypePhase.Typing);
					}
				}, TYPING_PAUSE_MS);

				return () => clearTimeout(timeout);
		}
	}, [phases, typedSuperpower, selectedIndex, phase]);

	return {
		typedPhase: typedSuperpower,
		phase,
		resume,
		selectedPhase: phases[selectedIndex]
	};
};
