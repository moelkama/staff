import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import OrdersStatistics from './Orders_Statistics';
import ArticlesStatistics from './Articles_Statistics';
import Loading from '../loading';

function MonthlyOrdersPerYear({ className}) {
    const [years, setYears] = useState(['2025', '2024']);
    const [year, setYear] = useState('2025');
    const [data, setData] = useState(
        // {
        //     xAxis_data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        //     yAxis_data: [2400, 1398, 9800, 3908, 4800, 3490, 4300, 2100, 2300, 2100, 2300, 2100],
        //   }
    );
    const [loading, setLoading] = useState(true);
    const changeYear = (e) => {
        setYear(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/api/statistics/Orders_per_month/${year}`)
            .then(res => res.json())
            .then(data => {
                setData(data.reduce((acc, { month, orders }) => {
                    acc.xAxis_data.push(String(month));  // Add month as string for x-axis
                    acc.yAxis_data.push(orders);         // Add orders for y-axis
                    return acc;
                }, { xAxis_data: [], yAxis_data: [] }));
                setLoading(false);
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }, [year]);

    return (
        <div className={className}>
            <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                <span className="bg-transparent px-2 text-xl font-bold">Orders Per Year</span>
            </h2>
            <div className="shadow-2xl px-2 flex border-b border-t border-r border-l border-gray- rounded-md">
                <div className='relative'>
                    <select onChange={changeYear} className="z-10 absolute top-4 right-4 h-8 font-black px-4 rounded-xl border border-gray-300">
                        {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                    </select>
                    {loading ?
                        <Loading />
                        :
                        <BarChart
                            {...{
                                width: 500,
                                height: 300,
                                xAxis: [{ data: data.xAxis_data, scaleType: 'band' }],
                            }}
                        series={[
                            {
                            data: data.yAxis_data,
                            label: 'Orders',
                            },
                        ]}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default function Statistics() {
    return (
            <div className="select-none grid grid-cols-3 gap-10 mx-auto">
                <OrdersStatistics />
                <div className='flex gap-20 flex-wrap'>
                    <MonthlyOrdersPerYear />
                    <ArticlesStatistics />
                </div>
            </div>
    )
}