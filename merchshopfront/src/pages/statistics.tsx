import React, { useState,useContext, FC, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AxisOptions, Chart } from 'react-charts';
import { DailyStars, Series } from '../utils/chartTypes';

const Statistics:FC  = () => {
    const [visitors, setVisitors] = useState<number>(0);
    const [itemsBought, setItemsBought] = useState<number>(0);
    
    useEffect(() => {
        window.scroll(0,0);
    });

    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
          getValue: (datum :{date: Date}) => datum.date,
        }),
        []
      )
    
      const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
          {
            getValue: (datum:{stars:number}) => datum.stars,
          },
        ],
        []
      )
      const data: Series[] = [
        {
          label: 'React Charts',
          data: [
            {
              date: new Date(),
              stars: 10,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() + 1)),
                stars: 15,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() + 2)),
                stars: 12,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() + 3)),
                stars: 16,
            },
          ]
        }
      ]

    return(
        <div className='flex flex-row min-h-screen min-w-full'>
            <div className='flex flex-col my-4 text-center w-1/2 mx-8'>
                visitors today {visitors}
                <div className='w-full h-1/4'>
                    <Chart options={{data,primaryAxis,secondaryAxes}}/>
                </div>      
            </div>
            <div className='flex flex-col my-4 text-center w-1/2 mx-8' >
                items bought today {itemsBought}
                <div className='w-full h-1/4'>
                    <Chart options={{data,primaryAxis,secondaryAxes}}/>
                </div>     
            </div>
        </div>
    );
}

export default Statistics;