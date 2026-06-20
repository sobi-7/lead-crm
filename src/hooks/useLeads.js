import { useState, useEffect } from 'react'
import { dummyLeads } from '../data/dummyLeads'

const STORAGE_KEY = 'profitcast_leads'

export function useLeads() {
  const [leads, setLeads] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyLeads))
      return dummyLeads
    } catch {
      return dummyLeads
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
    } catch (e) {
      console.error('Failed to save leads:', e)
    }
  }, [leads])

  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setLeads((prev) => [newLead, ...prev])
    return newLead
  }

  const updateLead = (id, updates) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
          : lead
      )
    )
  }

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  const getLeadById = (id) => leads.find((lead) => lead.id === id)

  const resetToDemo = () => {
    setLeads(dummyLeads)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyLeads))
  }

  return { leads, addLead, updateLead, deleteLead, getLeadById, resetToDemo }
}
