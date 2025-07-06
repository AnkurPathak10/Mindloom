import TitleSection from '@/components/landing-page/title-section'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from '@/lib/constants' 
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import CustomCard from '@/components/landing-page/custom-card'
import { randomUUID } from 'crypto'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card'

const HomePage = () => {
  return (
    <>
        <div
            className="w-full   blur-[150px] rounded-full h-32 absolute 
             bg-brand-primary-purple/50 -z-100 top-56"
          />
        <section className='overflow-hidden
         px-4 sm:px-6
         mt-10
         sm:flex sm:flex-col
         gap-4
         md:justify-center md:items-center'
         >
            <TitleSection pill='✨ Your Workspace Perfected' 
            title='All-In-One Collaboration and Productivity platform'/>

            <div className='bg-white mt-6 p-[2px] rounded-xl 
            bg-gradient-to-r from-primary-purple-300 to-brand-primary-blue
            sm:w-[300px]'>

                

              <Button variant='btn-secondary' className='w-full rounded-[10px]
              p-6 pb- text-2xl bg-background'>
                  Get MindLoom Free
              </Button>

            </div>
            <div className='md:mt-[-90px] sm:w-full w-[750px] flex 
            justify-center items-center relative sm:ml-0 ml-[-50px]'>
              <Image src="/appBanner.png" className='mt-[23px]' alt="Application Banner" width={750} height={400} />
              <div className='bottom-0 top-[50%] bg-gradient-to-t dark:from-background
              left-0 right-0 absolute z-10'></div>

            </div>
        </section>
  <section className='relative'>
  <div 
    className="overflow-hidden flex after:content[''] after:dark:from-brand-dark
    after:to-transparent after:from-background after:bg-gradient-to-l after:right-0
    after:bottom-0 after:top-0 after:w-20 after:absolute after:z-10
    
    before:content[''] before:dark:from-brand-dark
    before:to-transparent before:from-background before:bg-gradient-to-r before:left-0
    before:top-0 before:bottom-0 before:w-20 before:absolute before:z-10"
  >
    {[...Array(2)].map((_, i) => (
  <div key={i} className='flex flex-nowrap animate-slide'>
    {CLIENTS.map((client) => (
      <div key={client.alt} className='relative w-[200px] m-20 shrink-0 flex items-center'>
        <Image
          src={client.logo}
          alt={client.alt}
          width={200}
          height={200}
          className='object-contain max-w-none'
        />
      </div>
    ))}
  </div>
))}

  </div>
</section>
  <section className="px-4 sm:px-6 flex justify-center items-center
  flex-col relative">
        <div
  className="w-[300px] h-[150px] sm:w-[30%] sm:h-32 
  blur-[120px] rounded-full absolute bg-brand-primary-purple/50 
  -z-10 top-20 left-1/2 -translate-x-1/2"
/>
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
          pill="Features"
        />
        <div
  className="mt-10 w-full max-w-[600px] h-auto sm:h-[450px]
  flex justify-center items-center relative
  sm:ml-0 rounded-2xl overflow-hidden "
>
  <Image
    src="/Calendar.png"
    alt="Banner"
    className="w-full h-auto sm:h-full object-cover"
    width={750}
    height={450}
  />
</div>
  </section>
  <section className="relative">
  <div
    className="w-full blur-[120px] rounded-full h-32 absolute 
    bg-brand-primary-purple/50 -z-100 top-56"
  />

  <div
    className="mt-20 px-4 sm:px-6 flex flex-col 
    overflow-x-hidden overflow-visible"
  >
    <TitleSection
      title="Trusted by all"
      subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."
      pill="Testimonials"
    />

    {[...Array(2)].map((_, index) => (
      <div
        key={randomUUID()}
        className={twMerge(
          clsx(
            "mt-10 flex flex-nowrap gap-6 justify-center",
            index === 1 && "flex-row-reverse ml-[100px]",
            index === 1
              ? "animate-slide-reverse-slow"
              : "animate-slide-slow",
            "hover:paused"
          )
        )}
      >
        {USERS.map((testimonial ,userIndex) => (
          <CustomCard key={testimonial.name}
          className='w-[500px] shrink-0 rounded-xl dark:bg-gradient-to-t
          dark:from-border dark:to-background'
          cardHeader={ 
          <div 
            className='flex items-center gap-4'>
               <Avatar>
               <AvatarImage src={`avatars/${userIndex + 1}.png`} />
                <AvatarFallback>AV</AvatarFallback>
               </Avatar>
               <div>
                 <CardTitle className="text-foreground">{testimonial.name}</CardTitle>
                 <CardDescription className="dark:text-washed-purple-800">{testimonial.name.toLowerCase()}</CardDescription>
               </div>
          </div>
          } 
          cardContent={
            <p className='dark:text-washed-purple-800'>{testimonial.message}</p>
          }
           />
        ))}
      </div>
    ))}
  </div>
</section>
<section className='mt-20 px-4 sm:px-6'>
    <TitleSection
      title="The Perfect Plan For You"
      subheading="Experience all the benefits of our platform.
       Select a plan that suits your needs and take your productivity to new heights."
      pill="Testimonials"
    />
    <div className='flex flex-col-reverse sm:flex-row gap-4 justify-center
                    sm:items-stretch items-center mt-10'>
            
            {PRICING_CARDS.map((card) => (
  <div key={card.planType} className="relative">
    
    {card.planType === PRICING_PLANS.proplan && (
      <div
        className="absolute inset-0 z-[-1] w-full blur-[120px] h-32
        bg-brand-primary-purple/90 rounded-full top-1/2 -translate-y-1/2"
      />
    )}

    <CustomCard
      className={clsx(
        "w-[300px] rounded-2xl dark:bg-black/40 background-blur-3xl",
        {
          "border-brand-primary-purple/70":
            card.planType === PRICING_PLANS.proplan,
        }
      )}
      cardHeader={
        <CardTitle className="text-2xl font-semibold relative">
          {card.planType === PRICING_PLANS.proplan && (
            <Image
              src="/icons/diamond.svg"
              alt="Pro Plan Icon"
              className="absolute top-0 right-0"
              width={32}
              height={32}
            />
          )}
          {card.planType}
        </CardTitle>
      }
      cardContent={
        <CardContent className="p-0">
          <span className="font-normal text-2xl">{card.price}</span>
          {+card.price > 0 ? (
            <span className="dark:text-washed-purple-800 ml-1">/mo</span>
          ) : (
            ""
          )}
          <p className="dark:text-washed-purple-800">{card.description}</p>
          <Button variant="btn-primary" className="whitespace-nowrap w-full mt-4">
            {card.planType === PRICING_PLANS.proplan ? "Go Pro" : "Get Started"}
          </Button>
        </CardContent>
      }
      cardFooter={
        <ul className={clsx(
          "font-normal flex mb-2 flex-col gap-4",
          card.planType === PRICING_PLANS.freeplan && "pt-5" // 👈 added line
        )}>
          <small>{card.highlightFeature}</small>
          {card.freatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Image src="/icons/check.svg" alt="check icon" width={32} height={32} />
              {feature}
            </li>
          ))}
        </ul>
      }
    />
  </div>
))}

    </div>
</section>
</>
  )
}

export default HomePage