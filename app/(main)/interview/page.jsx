import React from 'react'
import { getAssessments } from "@/actions/interview";
import StatsCards from "../interview/_components/stats-cards";
import PerformanceChart from "../interview/_components/performance-chart";
import QuizList from "../interview/_components/Quiz-list";
const Interviewpage = async() => {
  const assessments=await getAssessments()
  return (
    <div>
      <h1>

      </h1>
      <div>
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  )
}

export default Interviewpage