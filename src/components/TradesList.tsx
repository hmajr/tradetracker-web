import { useEffect, useState } from 'react';
import { TradeDetail } from './TradeDetail';
import * as Popover from '@radix-ui/react-popover';
import { api } from '../lib/axios';

interface TradesListProps {
  date: Date
  onChangeTrades: (amount: number, winner: number) => void
}

interface TradesInfo {
  id: string,
  ticker: string,
  result: number,
  entry_date: Date,
  exit_date: Date
}

interface DayTradesResponse {
  possibleTrades: TradesInfo[];
  winTrades: string[]; 
}

export function TradesList( {date, onChangeTrades}: TradesListProps) {
  const [tradesInfo, setTradesInfo] = useState<DayTradesResponse | null>(null)
  const [shouldRefreshTrades, setShouldRefreshTrades ] = useState(false)

  function handleTradeList() {
    api.get<DayTradesResponse>('dayTrades', { // Specify the expected response type
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setTradesInfo(response.data)
      onChangeTrades(response.data.possibleTrades.length, response.data.winTrades.length)
    }).catch(error => {
      console.error("Can't get the trades info",error)
    })
  }

  useEffect(() => {
    handleTradeList()
  }, [])
  useEffect(() => {
    if(shouldRefreshTrades){
      handleTradeList()

      setShouldRefreshTrades(false)
    }
  }, [shouldRefreshTrades])

  
  return (
    <div className='mt-6 flex flex-col gap-3'>
      {/* Popover Trade Details */}
      {tradesInfo?.possibleTrades.map(trade =>{ 
        return(
          <Popover.Root key={`${trade.id}-pop`}>
            <Popover.Trigger>
              <span className='font-semibold text-xl text-white leading-tight'>
                  {trade.ticker} | {trade.result >= 0 ? `R$ ${trade.result}` : `-R$ ${trade.result*(-1)}`}
              </span>
            </Popover.Trigger>
            <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-500 flex flex-col'>
              <TradeDetail
                id={trade.id}
                ticker={trade.ticker} 
                result={trade.result} 
                entry={trade.entry_date} 
                exit={trade.exit_date}
                onTradeChanged={setShouldRefreshTrades}
              />
            </Popover.Content>
          </Popover.Root>
        )
      })}
    </div>

  )
}
