
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const height = 600;
    const width = 600;

    return (
        <g style={{pointerEvents: 'none'}}>
            <defs>
                <clipPath id="circle-clip">
                    <circle cx={cx} cy={cy} r={150} />
                </clipPath>
            </defs>
            <image 
                x={cx - width / 2} // width / 2 
                y={cy - height / 2} // height / 2 
                href={payload.src} 
                width={width} 
                height={height} 
                className='object-cover border-4 border-black'
                clipPath="url(#circle-clip)" 
            />
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
                
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function ArticlesStatistics() {
    const [data, setData] = useState([]);
    const [state, setState] = useState({activeIndex: 0});
    const [option, setOption] = useState('ALL');
    const options = ['ALL', 'TODAY', 'THIS WEEK', 'THIS MONTH', 'THIS YEAR'];
    const changeOption = (e) => {
        setOption(e.target.value);
    }

    useEffect(() => {
        fetch(`/api/statistics/Articles/${option}`)
            .then(res => res.json())
            .then(data => {
                console.log('dataaaaaaaaaaaa:::::::::::::', data);
                setData(data.data);
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }, [option]);
    const onPieEnter = (_, index) => {
        setState({activeIndex: index,});
    };
    return (
        <div className='h-[520px] w-[660px] relative'>
            <select onChange={changeOption} className="z-10 absolute top-4 right-4 h-8 font-black px-4 rounded-xl border border-gray-300">
                {options.map((year, index) => <option key={index} value={year}>{year}</option>)}
            </select>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={800} height={800}>
                <Pie
                    activeIndex={state.activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={150}
                    outerRadius={170}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}