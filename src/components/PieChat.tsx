import { MayHaveLabel, ResponsivePie } from '@nivo/pie'

    export type Data = {
        "id": string,
        "label": string,
        "value": number,
        "color": string,
    }

    const colors = [
            "#CBFEC0",
            "#99FF89",
            "#5DDB6C",
            "#276B37",
            "#FADE61",
            "#FACB61",
            "#FAB861",
            "#FB6762",
            "#D6DFF7"
    ]

const PieChart = ({ data }: { data: MayHaveLabel[] }) => {
    return (
        <ResponsivePie
            data={data}
            colors={colors}
            margin={{ top: 50, right: 15, bottom: 50, left: 15 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    color: 'rgba(0,0,0,0)',
                },
                {
                    id: 'lines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                }
            ]}
            fill={[
                {
                    match: {
                        id: '7am-Offline'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
        />
    )
}

export default PieChart;
