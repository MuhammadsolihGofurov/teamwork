import React from 'react'
import Skeleton from 'react-loading-skeleton'
import ExpertsSkeleton from './experts-skeleton'

export default function IndexExpertsSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton width={100} />
      <div className="flex flex-col w-full gap-2">
        <ExpertsSkeleton />
        <ExpertsSkeleton />
        <ExpertsSkeleton />
        <ExpertsSkeleton />
        <ExpertsSkeleton />
      </div>
    </div>
  )
}
