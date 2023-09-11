import {
	ArgumentAxis,
	CommonAxisSettings,
	CommonSeriesSettings,
	Chart as DxChart,
	Export,
	Format,
	Grid,
	Label,
	Legend,
	Margin,
	Series,
	Tooltip
} from 'devextreme-react/chart';
import { styled } from 'styled-components';
import { architectureSources, sharingStatisticsInfo } from '../mocks/data.ts';

const Chart = () => {
	return (
		<Box>
			<DxChart
				// palette='Dark Violet'
				animation={{ enabled: true }}
				dataSource={sharingStatisticsInfo}
				title='Architecture Share Over Time (Count)'>
				{/* <LoadingIndicator show /> */}
				<CommonSeriesSettings argumentField='year' type='spline' />
				<CommonAxisSettings>
					<Grid visible={true} />
				</CommonAxisSettings>
				{architectureSources.map((item) => (
					<Series key={item.value} valueField={item.value} name={item.name} />
				))}
				<Margin bottom={20} />
				<ArgumentAxis allowDecimals={false} axisDivisionFactor={60}>
					<Label>
						<Format type='decimal' />
					</Label>
				</ArgumentAxis>
				<Legend verticalAlignment='top' horizontalAlignment='right' />
				<Export enabled={true} />
				<Tooltip enabled={true} />
			</DxChart>
		</Box>
	);
};

const Box = styled.div`
	border-radius: 8px;
	box-shadow: 2px 2px 12px #ccc;
	padding: 16px;
	max-width: 100%;
	overflow-x: auto;
	flex-basis: 70%;
`;

export default Chart;
