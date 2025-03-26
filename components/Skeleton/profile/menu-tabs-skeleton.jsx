import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function MenuTabsSkeleton() {
  return (
    <div className='flex p-1 bg-white border border-bg-3 rounded-lg gap-1'>
        <Skeleton className='w-[120px] lg:w-[200px] h-[40px]'/>
        <Skeleton className='w-[120px] lg:w-[200px] h-[40px]'/>
        <Skeleton className='w-[120px] lg:w-[200px] h-[40px]'/>
    </div>
  )
}
