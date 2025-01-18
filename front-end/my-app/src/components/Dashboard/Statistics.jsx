import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import OrdersStatistics from './Orders_Statistics';
import ArticlesStatistics from './Articles_Statistics';
import Loading from '../loading';

function MonthlyOrdersPerYear({ classname }) {
    const [years, setYears] = useState([]);
    const [year, setYear] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const changeYear = (e) => {
        setYear(e.target.value);
    }

    useEffect(() => {
        fetch('/api/statistics/Years')
        .then(res => res.json())
        .then(data => {
            setYears(data.years);
        })
        .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
        const date = new Date();
        const year = date.getFullYear();
        setYear(year.toString());
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/statistics/Orders_per_month/${year}`)
            .then(res => res.json())
            .then(data => {
                setData(data.reduce((acc, { month, orders }) => {
                    acc.xAxis_data.push(String(month));
                    acc.yAxis_data.push(orders);
                    return acc;
                }, { xAxis_data: [], yAxis_data: [] }));
                setLoading(false);
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }, [year]);

    return (
        <div className={classname}>
            <h2 className="absolute top-2 left-8 text-xl font-bold">Orders Per Year</h2>
            <div className=" shadow-2xl px-2 flex border-b border-t border-r border-l border-gray- rounded-md">
                <div className='h-[520px] w-full relative'>
                    <select onChange={changeYear} className="z-10 absolute top-4 right-4 h-8 font-black px-4 rounded-xl border border-gray-300">
                        {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                    </select>
                    {loading ?
                        <Loading />
                        :
                        <BarChart 
                            {...{
                                xAxis: [{ data: data.xAxis_data, scaleType: 'band' }],
                            }}
                            series={[
                                {
                                data: data.yAxis_data,
                                label: 'Orders',
                                },
                            ]}
                            style={{ width: '100%', height: '100%' }}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default function Statistics() {
    return (
        <div className="select-none grid grid-cols-3 gap-10 p-8 mx-auto">
            <OrdersStatistics classname="relative w-full col-span-full" />
            <MonthlyOrdersPerYear classname='relative col-start-1 col-end-3'/>
            <ArticlesStatistics classname='relative col-start-3 col-end-4' />
        </div>
    )
}