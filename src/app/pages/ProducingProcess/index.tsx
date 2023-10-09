import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { data, resourcesData, priorityData } from './data';

/** @deprecated */
const SchedulerExample: React.FunctionComponent = () => {
	return (
		<Scheduler
			timeZone='America/Los_Angeles'
			dataSource={data}
			views={['timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth']}
			defaultCurrentView='timelineMonth'
			defaultCurrentDate={new Date()}
			height={600}
			groups={['priority']}
			cellDuration={60}
			firstDayOfWeek={0}
			startDayHour={8}
			endDayHour={20}>
			<Resource
				fieldExpr='ownerId'
				allowMultiple={true}
				dataSource={resourcesData}
				label='Owner'
				useColorAsDefault={true}
			/>
			<Resource fieldExpr='priority' allowMultiple={false} dataSource={priorityData} label='Priority' />
		</Scheduler>
	);
};

export default SchedulerExample;
