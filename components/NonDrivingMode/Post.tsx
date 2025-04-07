//Post.tsx
import React from 'react'
import PostInfo from './PostInfo'
import PostInteraction from './PostInteraction'
import { ViolenceUpdate } from './Feed'
import Image from 'next/image';

interface PostProps {
    update: ViolenceUpdate;
}

function Post({ update }: PostProps) {
    return (
        <div className='p-4 border-y-[1px] border-gray-700 ml-4'>
            <div className='flex items-center gap-2 text-sm mb-2 font-bold'>
                icon
                <span>Username</span>
            </div>

            {/* POST CONTENT */}
            <div className='flex gap-4'>
                {/* AVATAR */}
                {/* <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                    <Image
                        path='general/male1.jpg'
                        alt=''
                        w={50}
                        h={50}
                        tr={true}
                    />
                </div> */}
                {/* CONTENT */}
                <div className='flex-1 flex flex-col gap-2'>
                    {/* TOP SECTION */}
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <h1 className='text-md font-bold'>{update.user}</h1>
                            <span className='text-gray-800'></span>
                            <span className='text-gray-800'></span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Posted on: {new Date(update.createdAt).toLocaleString()}
                        </p>
                        <PostInfo />
                    </div>
                    {/* MIDDLE SECTION */}
                    <p className=''>
                        {update.desc}
                    </p>
                    {update.imageUrl && (
                        <div className="mt-2">
                            <Image
                                src={update.imageUrl}
                                width={400}
                                height={300}
                                alt="Post image"
                                className="rounded-lg" />
                        </div>
                    )}
                    {update.location && (
                        <p className="mt-2 text-sm text-gray-500">
                            Location: {update.location.address || `${update.location.lat}, ${update.location.lng}`}
                        </p>
                    )}
                    {update.date && (
                        <p className="mt-2 text-sm text-gray-500">Event Date: {new Date(update.date).toLocaleDateString()}</p>
                    )}
                    <PostInteraction />
                </div>
            </div>
        </div>
    )
}

export default Post