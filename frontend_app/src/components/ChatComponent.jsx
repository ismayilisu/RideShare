import react from 'react'

const ChatComponent=({msg,date,time,curr,user_id})=>{


    
    return (
    <div className={user_id==curr ?('flex flex-col  items-end'):( 'flex flex-col items-start')}>
    <div className='w-fit h-fit bg-white rounded-sm p-1'>
    <h2>{user_id==curr? `ME : ${msg}`:`USER : ${msg}`}</h2>

    </div>
    <div className=' flex flex-col gap-1 p-1 bg-white rounded-sm'>
        <h1 className='text-sm'> {date}</h1>
        <h1 className='text-sm'> {time}</h1>
    </div>


    </div>)
}

export default ChatComponent