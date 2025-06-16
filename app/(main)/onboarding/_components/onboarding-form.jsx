"use client"
import { onboardingSchema } from '@/app/lib/schema'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/use-fetch'
import { updateUser } from '@/actions/user'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
const OnboardingForm = ({industries}) => {
  const [selectedIndustry,setSelectedIndustry]=useState(null);
  const router=useRouter()

  const {loading:updateLoading, fn:updateUserFn, data:updateResult}=useFetch(updateUser)

  const {register,handleSubmit,formState:{errors},setValue,watch,}=useForm({
    resolver: zodResolver(onboardingSchema)
  })

  const onSubmit=async(values)=>{
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      })
      console.log("Submitting Values:", {
        ...values,
        industry: formattedIndustry,
      })
      console.log("Update Result:", updateResult)
      ;
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again."); // show an error
    }
  }

  useEffect(()=>{
    if(updateResult?.success && !updateLoading){
      toast.success("Profile updated successfully")
      router.push("/dashboard")
      router.refresh()
    }
  },[updateResult,updateLoading])

  const watchIndustry=watch("industry")
  console.log(updateLoading)
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            
            <div className='space-y-2'>
            <Label htmlFor="industry">Industry</Label>
            <Select onValueChange={(value) => {
              setValue("industry", value)
              setSelectedIndustry(industries.find((ind) => ind.id === value))
              setValue("subIndustry", "")
            }}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select an Industry" />
              </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => {
                return <SelectItem key={ind.id} value={ind.id} >{ind.name}</SelectItem>
              })}
            </SelectContent>
          </Select>
          {errors.industry &&(<p className="text-sm text-red-500">{errors.industry.message}</p>)}
          </div>

          {watchIndustry &&(
            <div className='space-y-2'>
            <Label htmlFor="subIndustry">Specialization</Label>
            <Select onValueChange={(value) => {
              setValue("subIndustry", value)
            }}>
              <SelectTrigger id="subIndustry">
                <SelectValue placeholder="Select an SubIndustry" />
              </SelectTrigger>
            <SelectContent>
              {selectedIndustry?.subIndustries.map((ind) => {
                return <SelectItem value={ind} key={ind}>{ind}</SelectItem>
              })}
            </SelectContent>
          </Select>
          {errors.subIndustry &&(<p className="text-sm text-red-500">{errors.subIndustry.message}</p>)}
          </div>)}
          <div className='space-y-2'>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input id="experience" type="number" min="0" max="50" placeholder="Enter your years of experience" {...register("experience")} />
          {errors.experience &&(<p className="text-sm text-red-500">{errors.experience.message}</p>)}
          </div>
          <div className='space-y-2'>
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" type="text"  placeholder="Enter your skills eg., Python, JavaScript" {...register("skills")} />
          <p className='text-sm text-muted-foreground'>Separate multiple skills with commaa</p>
          {errors.skills &&(<p className="text-sm text-red-500">{errors.skills.message}</p>)}
          </div>
          <div className='space-y-2'>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea id="bio" type="text" placeholder="Enter your professional background.." {...register("bio")} />
          {errors.bio &&(<p className="text-sm text-red-500">{errors.bio.message}</p>)}
          </div>
          <Button type="submit" className="w-full" disabled={!updateLoading}>
          {updateLoading ? (
              "Complete Profile"
              ) : (
                <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Saving...
             </>
            )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingForm