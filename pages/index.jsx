import Header from '@/components/Header'
import Hero from '@/components/Home/Hero'
import JobSearch from '@/components/Jobs/JobSearch'
import JobsList from '@/components/Jobs/JobsList'

const jobs = [
  {
    id: 1,
    status: 'guaranteed',
    brandColor: null,
    location: 'New York',
    title: 'Javascript Engineer',
    company: 'Google',
    createdAt: '1 day ago',
    avatar: 'https://picsum.photos/200/300',
    tags: [
      {
        id: 1,
        name: 'SEO Engineer',
        slug: 'seo-engineer',
      },
      {
        id: 2,
        name: 'UX Designer',
        slug: 'ux-designer',
      },
      {
        id: 3,
        name: 'Semi-Senior Frontend Developer',
        slug: 'semi-senior-frontend-developer',
      },
    ],
  },
  {
    id: 2,
    status: 'featured',
    brandColor: '#410080',
    location: 'Worldwide',
    title: 'Frontend Engineer',
    company: 'Facebook',
    createdAt: '2 day ago',
    avatar: 'https://picsum.photos/200/300',
    tags: [
      {
        id: 1,
        name: 'SEO Engineer',
        slug: 'seo-engineer',
      },
      {
        id: 2,
        name: 'UX Designer',
        slug: 'ux-designer',
      },
      {
        id: 3,
        name: 'Semi-Senior Frontend Developer',
        slug: 'semi-senior-frontend-developer',
      },
    ],
  },
]

const Index = () => {
  return (
    <>
      <Header />
      <main role="main" className="pb-10">
        <Hero />
        <JobSearch />
        <JobsList jobs={jobs} />
      </main>
    </>
  )
}

export default Index
