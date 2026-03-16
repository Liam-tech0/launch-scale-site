export type BusinessStatus = 'completed' | 'in_progress' | 'upcoming'

export interface Business {
  month: number
  name: string
  description: string
  status: BusinessStatus
  revenue: number
  target: number
  startDate: string
  category: string
  videoUrl?: string
}

export interface ChallengeStats {
  totalRevenue: number
  totalTarget: number
  currentMonth: number
  businessesCompleted: number
  businessesInProgress: number
}

export const CHALLENGE_BUSINESSES: Business[] = [
  {
    month: 1,
    name: 'Sites Vitrines',
    description: 'Vente de sites HTML clé-en-main à des restaurants et commerces locaux à Nice.',
    status: 'in_progress',
    revenue: 0,
    target: 2000,
    startDate: 'Mars 2025',
    category: 'Web / Local',
  },
  {
    month: 2,
    name: '???',
    description: 'Business à venir. Suivi sur YouTube.',
    status: 'upcoming',
    revenue: 0,
    target: 5000,
    startDate: 'Avril 2025',
    category: 'TBD',
  },
  {
    month: 3,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 8000,
    startDate: 'Mai 2025',
    category: 'TBD',
  },
  {
    month: 4,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 15000,
    startDate: 'Juin 2025',
    category: 'TBD',
  },
  {
    month: 5,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 25000,
    startDate: 'Juillet 2025',
    category: 'TBD',
  },
  {
    month: 6,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 50000,
    startDate: 'Août 2025',
    category: 'TBD',
  },
  {
    month: 7,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 80000,
    startDate: 'Septembre 2025',
    category: 'TBD',
  },
  {
    month: 8,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 120000,
    startDate: 'Octobre 2025',
    category: 'TBD',
  },
  {
    month: 9,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 180000,
    startDate: 'Novembre 2025',
    category: 'TBD',
  },
  {
    month: 10,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 250000,
    startDate: 'Décembre 2025',
    category: 'TBD',
  },
  {
    month: 11,
    name: '???',
    description: 'Business à venir.',
    status: 'upcoming',
    revenue: 0,
    target: 400000,
    startDate: 'Janvier 2026',
    category: 'TBD',
  },
  {
    month: 12,
    name: '???',
    description: 'Business final. Le tout ou rien.',
    status: 'upcoming',
    revenue: 0,
    target: 1000000,
    startDate: 'Février 2026',
    category: 'TBD',
  },
]

export function getChallengeStats(): ChallengeStats {
  const totalRevenue = CHALLENGE_BUSINESSES.reduce((acc, b) => acc + b.revenue, 0)
  const totalTarget = 1_000_000
  const currentMonth = CHALLENGE_BUSINESSES.find((b) => b.status === 'in_progress')?.month ?? 1
  const businessesCompleted = CHALLENGE_BUSINESSES.filter((b) => b.status === 'completed').length
  const businessesInProgress = CHALLENGE_BUSINESSES.filter((b) => b.status === 'in_progress').length

  return { totalRevenue, totalTarget, currentMonth, businessesCompleted, businessesInProgress }
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `€${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `€${(amount / 1_000).toFixed(0)}K`
  return `€${amount.toLocaleString('fr-FR')}`
}
