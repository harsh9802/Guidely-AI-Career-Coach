import React from 'react'
// import OnboardingForm from '@/components/onboarding-form'
import {industries} from '@/data/industries'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getIndustryInsights } from '@/actions/insights'

const OnboardingPage = async() => {
  const {isOnboarded}=await getUserOnboardingStatus();
  const insights=await getIndustryInsights()
  if (isOnboarded) {
    redirect('/dashboard')
  }
  return (
    <main>
        <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage
