import Reaasyncct from 'react'
import ResumeBuilder from './_components/resume-builder'
import { getResume } from '@/actions/resume'

const Resumepage = async() => {
    const resume=await getResume();

    return (
        <div className='container mx-auto py-6'>
            <ResumeBuilder initialContent={resume?.content}/>
        </div>
    )
}

export default Resumepage