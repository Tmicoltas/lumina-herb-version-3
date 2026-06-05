export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: number
          product_id: string
          user_id: string
          user_name: string
          comment: string
          created_at: string
        }
        Insert: {
          id?: number
          product_id: string
          user_id: string
          user_name: string
          comment: string
          created_at?: string
        }
        Update: {
          id?: number
          product_id?: string
          user_id?: string
          user_name?: string
          comment?: string
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: number
          user_id: string
          total: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          total: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          total?: number
          created_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: number
          order_id: number
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: string
          quantity?: number
          price?: number
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
