import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PageSkeleton = () => {
  return (
    <div className='flex flex-col w-full h-full bg-gray-50'>
      {/* Header Placeholder */}
      <div className="h-16 w-full bg-white border-b p-4">
        <Skeleton width={150} height={30} />
      </div>

      <div className='flex-1 flex flex-col'>
        {/* Sidebar Placeholder */}
        <div className='hidden md:flex flex-col gap-6 fixed left-0 top-0 bottom-0 w-52 p-4 bg-white border-r'>
          <Skeleton circle height={60} width={60} />
          <Skeleton count={5} height={40} className="mb-2" />
        </div>

        {/* Main Content Area */}
        <div className='flex-1 flex flex-col gap-4 mt-5 md:ml-60 md:mr-5'>
          <div className="px-4">
             <Skeleton height={40} width={300} borderRadius={10} />
          </div>
          
          {/* Tab Buttons Placeholder */}
          <div className='flex gap-2 px-4'>
            <Skeleton width={100} height={40} />
            <Skeleton width={100} height={40} />
            <Skeleton width={100} height={40} />
          </div>

          {/* Textarea/Main Box Placeholder */}
          <div className='flex-1 mx-4 bg-white rounded-xl p-6'>
            <div className="flex gap-4 mb-4">
              <Skeleton width={100} height={25} borderRadius={20} />
              <Skeleton width={120} height={25} borderRadius={20} />
            </div>
            <Skeleton height="70%" />
            <div className="flex justify-end mt-4">
              <Skeleton width={150} height={50} borderRadius={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};