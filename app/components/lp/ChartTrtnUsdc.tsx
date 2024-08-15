import React, {FC, useEffect, useRef} from "react";
import {createChart} from "lightweight-charts";
import {getDbTrtnCirc, getDbTrtnUsdc} from "../../utils/db";
interface ChartTrtnUsdcProps {
    className?: string;
}
const ChartTrtnUsdc: FC<ChartTrtnUsdcProps> = (
  {className}
) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await Promise.all([
                getDbTrtnUsdc(),
                getDbTrtnCirc()
            ]);
            if(chartContainerRef?.current) {
                const chart = createChart(chartContainerRef.current, {
                    // @ts-ignore
                    width: chartContainerRef.current.clientWidth,
                    // @ts-ignore
                    height: chartContainerRef.current.clientHeight,
                    rightPriceScale: {
                        scaleMargins: {
                            top: 0.1,
                            bottom: 0.35,
                        },
                        borderVisible: true,
                        borderColor: '#bdb9b9'
                    },
                    layout: {
                        backgroundColor: 'transparent',
                        textColor: '#ffffffa8',
                    },
                    grid: {
                        vertLines: {
                            color: '#48494abb',
                        },
                        horzLines: {
                            color: '#48494abb',
                        },
                    },
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: false,
                        borderColor: '#bdb9b9',
                        rightOffset: 2,
                        
                    },

                });
                const lineSeries = chart.addAreaSeries({
                    topColor: 'rgba(235,128,72, 0.56)',
                    bottomColor: 'rgba(209,138,97, 0.04)',
                    lineColor: '#eb8048',
                    lineWidth: 2,
                });

                lineSeries.setData(response[0].data);
                const barSeries = chart.addHistogramSeries({
                    color:  'rgba(195,225,193, 0.75)',
                    baseLineColor: '#fff',
                    priceFormat: {
                        type: 'volume',
                    },
                    priceLineWidth: 1,
                    priceScaleId: '',
                    scaleMargins: {
                        top: 0.7,
                        bottom: 0,
                    }
                });
                barSeries.setData(response[1].data);
            }
        }

        fetchData();

    }, [chartContainerRef]);

    return (<div ref={chartContainerRef} className={className || "w-full h-96"} />);
}


export default ChartTrtnUsdc;