export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      acc_accessibility_issues: {
        Row: {
          ai_recommendation: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          element_html: string | null
          element_selector: string | null
          id: string
          organization_id: string
          page_url: string
          resolved_at: string | null
          rule_id: string
          scan_id: string | null
          severity: Database["public"]["Enums"]["acc_severity"]
          status: Database["public"]["Enums"]["acc_issue_status"]
          suggested_fix: string | null
          title: string
          updated_at: string
          wcag_reference: string | null
          website_id: string
        }
        Insert: {
          ai_recommendation?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          element_html?: string | null
          element_selector?: string | null
          id?: string
          organization_id: string
          page_url: string
          resolved_at?: string | null
          rule_id: string
          scan_id?: string | null
          severity?: Database["public"]["Enums"]["acc_severity"]
          status?: Database["public"]["Enums"]["acc_issue_status"]
          suggested_fix?: string | null
          title: string
          updated_at?: string
          wcag_reference?: string | null
          website_id: string
        }
        Update: {
          ai_recommendation?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          element_html?: string | null
          element_selector?: string | null
          id?: string
          organization_id?: string
          page_url?: string
          resolved_at?: string | null
          rule_id?: string
          scan_id?: string | null
          severity?: Database["public"]["Enums"]["acc_severity"]
          status?: Database["public"]["Enums"]["acc_issue_status"]
          suggested_fix?: string | null
          title?: string
          updated_at?: string
          wcag_reference?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_accessibility_issues_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_accessibility_issues_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "acc_scans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_accessibility_issues_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "acc_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_ai_recommendations: {
        Row: {
          category: string
          created_at: string
          estimated_impact: string | null
          id: string
          message: string
          organization_id: string
          priority: Database["public"]["Enums"]["acc_severity"]
          title: string
          website_id: string
        }
        Insert: {
          category: string
          created_at?: string
          estimated_impact?: string | null
          id?: string
          message: string
          organization_id: string
          priority?: Database["public"]["Enums"]["acc_severity"]
          title: string
          website_id: string
        }
        Update: {
          category?: string
          created_at?: string
          estimated_impact?: string | null
          id?: string
          message?: string
          organization_id?: string
          priority?: Database["public"]["Enums"]["acc_severity"]
          title?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_ai_recommendations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_ai_recommendations_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "acc_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_api_keys: {
        Row: {
          created_at: string
          created_by: string
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          organization_id: string
          revoked_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          organization_id: string
          revoked_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          organization_id?: string
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acc_api_keys_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string | null
          organization_id: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string | null
          organization_id?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string | null
          organization_id?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_organization_members: {
        Row: {
          created_at: string
          id: string
          invited_at: string | null
          invited_email: string | null
          joined_at: string | null
          organization_id: string
          role: Database["public"]["Enums"]["acc_member_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_at?: string | null
          invited_email?: string | null
          joined_at?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["acc_member_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_at?: string | null
          invited_email?: string | null
          joined_at?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["acc_member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_organizations: {
        Row: {
          brand_color: string | null
          created_at: string
          created_by: string
          id: string
          is_agency: boolean
          logo_url: string | null
          name: string
          plan: Database["public"]["Enums"]["acc_plan"]
          slug: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          updated_at: string
          white_label: Json | null
        }
        Insert: {
          brand_color?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_agency?: boolean
          logo_url?: string | null
          name: string
          plan?: Database["public"]["Enums"]["acc_plan"]
          slug: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string
          white_label?: Json | null
        }
        Update: {
          brand_color?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_agency?: boolean
          logo_url?: string | null
          name?: string
          plan?: Database["public"]["Enums"]["acc_plan"]
          slug?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string
          white_label?: Json | null
        }
        Relationships: []
      }
      acc_reports: {
        Row: {
          created_at: string
          file_url: string | null
          format: string
          generated_by: string | null
          id: string
          organization_id: string
          period_end: string | null
          period_start: string | null
          type: string
          website_id: string | null
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          format?: string
          generated_by?: string | null
          id?: string
          organization_id: string
          period_end?: string | null
          period_start?: string | null
          type: string
          website_id?: string | null
        }
        Update: {
          created_at?: string
          file_url?: string | null
          format?: string
          generated_by?: string | null
          id?: string
          organization_id?: string
          period_end?: string | null
          period_start?: string | null
          type?: string
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acc_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_reports_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "acc_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_scan_pages: {
        Row: {
          created_at: string
          id: string
          issue_count: number | null
          scan_id: string
          score: number | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_count?: number | null
          scan_id: string
          score?: number | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_count?: number | null
          scan_id?: string
          score?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_scan_pages_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "acc_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_scans: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          organization_id: string
          pages_scanned: number | null
          score: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["acc_scan_status"]
          summary: Json | null
          total_issues: number | null
          triggered_by: string | null
          wcag_aa_pct: number | null
          website_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          organization_id: string
          pages_scanned?: number | null
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["acc_scan_status"]
          summary?: Json | null
          total_issues?: number | null
          triggered_by?: string | null
          wcag_aa_pct?: number | null
          website_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          organization_id?: string
          pages_scanned?: number | null
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["acc_scan_status"]
          summary?: Json | null
          total_issues?: number | null
          triggered_by?: string | null
          wcag_aa_pct?: number | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_scans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_scans_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "acc_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_websites: {
        Row: {
          allowed_domains: string[]
          created_at: string
          current_score: number | null
          id: string
          last_scan_at: string | null
          name: string
          organization_id: string
          updated_at: string
          url: string
          verification_last_checked_at: string | null
          verification_last_error: string | null
          verification_status: string
          verification_token: string | null
          verified_at: string | null
          widget_enabled: boolean
        }
        Insert: {
          allowed_domains?: string[]
          created_at?: string
          current_score?: number | null
          id?: string
          last_scan_at?: string | null
          name: string
          organization_id: string
          updated_at?: string
          url: string
          verification_last_checked_at?: string | null
          verification_last_error?: string | null
          verification_status?: string
          verification_token?: string | null
          verified_at?: string | null
          widget_enabled?: boolean
        }
        Update: {
          allowed_domains?: string[]
          created_at?: string
          current_score?: number | null
          id?: string
          last_scan_at?: string | null
          name?: string
          organization_id?: string
          updated_at?: string
          url?: string
          verification_last_checked_at?: string | null
          verification_last_error?: string | null
          verification_status?: string
          verification_token?: string | null
          verified_at?: string | null
          widget_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "acc_websites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "acc_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_widget_settings: {
        Row: {
          custom_css: string | null
          enabled_features: Json | null
          hide_branding: boolean | null
          id: string
          logo_url: string | null
          position: string
          primary_color: string | null
          updated_at: string
          website_id: string
        }
        Insert: {
          custom_css?: string | null
          enabled_features?: Json | null
          hide_branding?: boolean | null
          id?: string
          logo_url?: string | null
          position?: string
          primary_color?: string | null
          updated_at?: string
          website_id: string
        }
        Update: {
          custom_css?: string | null
          enabled_features?: Json | null
          hide_branding?: boolean | null
          id?: string
          logo_url?: string | null
          position?: string
          primary_color?: string | null
          updated_at?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acc_widget_settings_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: true
            referencedRelation: "acc_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_access_codes: {
        Row: {
          action_plan: Json | null
          business_model: string | null
          business_reach: string | null
          client_name: string
          code: string
          created_at: string
          created_by: string
          executive_summary_gaps: string | null
          executive_summary_strengths: string | null
          expires_at: string | null
          gbp_url: string | null
          id: string
          industry: string | null
          is_active: boolean
          primary_goals: string[] | null
          questionnaire_completed: boolean | null
          target_audience: string | null
          updated_at: string
          website_url: string
        }
        Insert: {
          action_plan?: Json | null
          business_model?: string | null
          business_reach?: string | null
          client_name: string
          code: string
          created_at?: string
          created_by: string
          executive_summary_gaps?: string | null
          executive_summary_strengths?: string | null
          expires_at?: string | null
          gbp_url?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          primary_goals?: string[] | null
          questionnaire_completed?: boolean | null
          target_audience?: string | null
          updated_at?: string
          website_url: string
        }
        Update: {
          action_plan?: Json | null
          business_model?: string | null
          business_reach?: string | null
          client_name?: string
          code?: string
          created_at?: string
          created_by?: string
          executive_summary_gaps?: string | null
          executive_summary_strengths?: string | null
          expires_at?: string | null
          gbp_url?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          primary_goals?: string[] | null
          questionnaire_completed?: boolean | null
          target_audience?: string | null
          updated_at?: string
          website_url?: string
        }
        Relationships: []
      }
      audit_results: {
        Row: {
          access_code_id: string
          audit_type: string
          category: string
          created_at: string
          details: Json | null
          id: string
          item_name: string
          positive_feedback: string | null
          recommendations: string | null
          score: number
          status: string
          updated_at: string
        }
        Insert: {
          access_code_id: string
          audit_type: string
          category: string
          created_at?: string
          details?: Json | null
          id?: string
          item_name: string
          positive_feedback?: string | null
          recommendations?: string | null
          score: number
          status: string
          updated_at?: string
        }
        Update: {
          access_code_id?: string
          audit_type?: string
          category?: string
          created_at?: string
          details?: Json | null
          id?: string
          item_name?: string
          positive_feedback?: string | null
          recommendations?: string | null
          score?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_results_access_code_id_fkey"
            columns: ["access_code_id"]
            isOneToOne: false
            referencedRelation: "audit_access_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_expenses: {
        Row: {
          amount: number
          budget_item_id: string
          created_at: string
          created_by: string
          expense_date: string
          id: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          budget_item_id: string
          created_at?: string
          created_by: string
          expense_date: string
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          budget_item_id?: string
          created_at?: string
          created_by?: string
          expense_date?: string
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_expenses_budget_item_id_fkey"
            columns: ["budget_item_id"]
            isOneToOne: false
            referencedRelation: "budget_items"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_items: {
        Row: {
          billing_frequency: string
          category: string
          cost: number
          created_at: string
          created_by: string
          description: string | null
          id: string
          next_billing_date: string
          status: string
          tool_name: string
          updated_at: string
        }
        Insert: {
          billing_frequency?: string
          category?: string
          cost: number
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          next_billing_date: string
          status?: string
          tool_name: string
          updated_at?: string
        }
        Update: {
          billing_frequency?: string
          category?: string
          cost?: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          next_billing_date?: string
          status?: string
          tool_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      chatbot_conversations: {
        Row: {
          created_at: string
          id: string
          message_count: number
          messages: Json
          session_id: string
          updated_at: string
          visitor_section: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message_count?: number
          messages?: Json
          session_id: string
          updated_at?: string
          visitor_section?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message_count?: number
          messages?: Json
          session_id?: string
          updated_at?: string
          visitor_section?: string | null
        }
        Relationships: []
      }
      chatbot_training_entries: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_citations: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          label: string
          node_id: string
          status: string | null
          type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          label: string
          node_id: string
          status?: string | null
          type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          label?: string
          node_id?: string
          status?: string | null
          type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_citations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_diagram_nodes: {
        Row: {
          client_id: string
          id: string
          node_id: string
          updated_at: string
          updated_by: string
          x_position: number
          y_position: number
        }
        Insert: {
          client_id: string
          id?: string
          node_id: string
          updated_at?: string
          updated_by: string
          x_position: number
          y_position: number
        }
        Update: {
          client_id?: string
          id?: string
          node_id?: string
          updated_at?: string
          updated_by?: string
          x_position?: number
          y_position?: number
        }
        Relationships: []
      }
      clients: {
        Row: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_by: string
          date_added: string
          google_access_token: string | null
          google_drive_folder_id: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          id: string
          logo_url: string | null
          notes: string | null
          status: string
        }
        Insert: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_by: string
          date_added?: string
          google_access_token?: string | null
          google_drive_folder_id?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          logo_url?: string | null
          notes?: string | null
          status?: string
        }
        Update: {
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_by?: string
          date_added?: string
          google_access_token?: string | null
          google_drive_folder_id?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          logo_url?: string | null
          notes?: string | null
          status?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          activity_date: string
          activity_type: string
          created_at: string
          created_by: string
          id: string
          lead_id: string
          notes: string | null
          summary: string
        }
        Insert: {
          activity_date?: string
          activity_type: string
          created_at?: string
          created_by: string
          id?: string
          lead_id: string
          notes?: string | null
          summary: string
        }
        Update: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          created_by?: string
          id?: string
          lead_id?: string
          notes?: string | null
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          file_path: string
          file_size: string | null
          file_type: string | null
          id: string
          name: string
          storage_object_id: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: string | null
          file_type?: string | null
          id?: string
          name: string
          storage_object_id?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: string | null
          file_type?: string | null
          id?: string
          name?: string
          storage_object_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          commission_value: number | null
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          converted_to_client_id: string | null
          created_at: string
          created_by: string
          estimated_value: number | null
          id: string
          next_follow_up: string | null
          notes: string | null
          payment_type: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          commission_value?: number | null
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          converted_to_client_id?: string | null
          created_at?: string
          created_by: string
          estimated_value?: number | null
          id?: string
          next_follow_up?: string | null
          notes?: string | null
          payment_type?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          commission_value?: number | null
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          converted_to_client_id?: string | null
          created_at?: string
          created_by?: string
          estimated_value?: number | null
          id?: string
          next_follow_up?: string | null
          notes?: string | null
          payment_type?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_converted_to_client_id_fkey"
            columns: ["converted_to_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_kpis: {
        Row: {
          category: string
          client_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number
          period_end: string
          period_start: string
          target_value: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          client_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          period_end: string
          period_start: string
          target_value?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          client_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          period_end?: string
          period_start?: string
          target_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_kpis_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_plans: {
        Row: {
          budget: Json | null
          budget_breakdown: Json | null
          client_id: string
          competitor_analysis: Json | null
          created_at: string
          executive_summary: Json | null
          id: string
          implementation_timeline: Json | null
          kpi_framework: Json | null
          market_analysis: Json | null
          marketing_objectives: Json | null
          metadata: Json | null
          strategies: Json | null
          swot_analysis: Json | null
          target_audiences: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          budget?: Json | null
          budget_breakdown?: Json | null
          client_id: string
          competitor_analysis?: Json | null
          created_at?: string
          executive_summary?: Json | null
          id?: string
          implementation_timeline?: Json | null
          kpi_framework?: Json | null
          market_analysis?: Json | null
          marketing_objectives?: Json | null
          metadata?: Json | null
          strategies?: Json | null
          swot_analysis?: Json | null
          target_audiences?: Json | null
          title?: string
          updated_at?: string
        }
        Update: {
          budget?: Json | null
          budget_breakdown?: Json | null
          client_id?: string
          competitor_analysis?: Json | null
          created_at?: string
          executive_summary?: Json | null
          id?: string
          implementation_timeline?: Json | null
          kpi_framework?: Json | null
          market_analysis?: Json | null
          marketing_objectives?: Json | null
          metadata?: Json | null
          strategies?: Json | null
          swot_analysis?: Json | null
          target_audiences?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      project_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          order_index: number
          priority: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          order_index?: number
          priority?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          order_index?: number
          priority?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: string
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          progress: number
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          progress: number
          start_date?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          progress?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          amount: number
          created_at: string
          created_by: string
          document_url: string | null
          due_date: string | null
          id: string
          lead_id: string
          notes: string | null
          sent_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by: string
          document_url?: string | null
          due_date?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          sent_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string
          document_url?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          sent_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_incidents: {
        Row: {
          affected_services: string[] | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          incident_id: string
          incident_type: string
          provider_id: string
          resolved_at: string | null
          severity: string
          started_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          affected_services?: string[] | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          incident_id: string
          incident_type: string
          provider_id: string
          resolved_at?: string | null
          severity: string
          started_at: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          affected_services?: string[] | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          incident_id?: string
          incident_type?: string
          provider_id?: string
          resolved_at?: string | null
          severity?: string
          started_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_incidents_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_status_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_status_cache: {
        Row: {
          created_at: string
          id: string
          last_checked: string
          provider_id: string
          status: string
          summary: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_checked?: string
          provider_id: string
          status: string
          summary: string
        }
        Update: {
          created_at?: string
          id?: string
          last_checked?: string
          provider_id?: string
          status?: string
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_status_cache_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_status_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_status_configs: {
        Row: {
          brand_color: string | null
          category: string | null
          check_method: string
          created_at: string
          description: string | null
          display_order: number
          icon_initials: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          slug: string
          status_endpoint: string | null
          updated_at: string
        }
        Insert: {
          brand_color?: string | null
          category?: string | null
          check_method?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon_initials: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          slug: string
          status_endpoint?: string | null
          updated_at?: string
        }
        Update: {
          brand_color?: string | null
          category?: string | null
          check_method?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon_initials?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          slug?: string
          status_endpoint?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      social_media_posts: {
        Row: {
          client_id: string
          content: string | null
          created_at: string
          engagement_metrics: Json | null
          id: string
          media_urls: string[] | null
          platform: string
          post_id: string
          post_url: string | null
          published_at: string | null
          updated_at: string
          webhook_data: Json | null
        }
        Insert: {
          client_id: string
          content?: string | null
          created_at?: string
          engagement_metrics?: Json | null
          id?: string
          media_urls?: string[] | null
          platform: string
          post_id: string
          post_url?: string | null
          published_at?: string | null
          updated_at?: string
          webhook_data?: Json | null
        }
        Update: {
          client_id?: string
          content?: string | null
          created_at?: string
          engagement_metrics?: Json | null
          id?: string
          media_urls?: string[] | null
          platform?: string
          post_id?: string
          post_url?: string | null
          published_at?: string | null
          updated_at?: string
          webhook_data?: Json | null
        }
        Relationships: []
      }
      staff_document_assignments: {
        Row: {
          assigned_at: string
          document_id: string
          id: string
          staff_id: string
        }
        Insert: {
          assigned_at?: string
          document_id: string
          id?: string
          staff_id: string
        }
        Update: {
          assigned_at?: string
          document_id?: string
          id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_document_assignments_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "staff_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_document_assignments_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_documents: {
        Row: {
          created_at: string
          description: string | null
          file_path: string
          file_size: string
          file_type: string
          id: string
          name: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path: string
          file_size: string
          file_type: string
          id?: string
          name: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: string
          file_type?: string
          id?: string
          name?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      staff_members: {
        Row: {
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          position: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          position: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          position?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          duration_seconds: number | null
          end_time: string | null
          id: string
          start_time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          id?: string
          start_time: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          id?: string
          start_time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          client_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_admin: boolean
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean
        }
        Update: {
          client_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      acc_can_manage_org: {
        Args: { _org_id: string; _user_id?: string }
        Returns: boolean
      }
      acc_is_org_member: {
        Args: { _org_id: string; _user_id?: string }
        Returns: boolean
      }
      acc_org_role: {
        Args: { _org_id: string; _user_id?: string }
        Returns: Database["public"]["Enums"]["acc_member_role"]
      }
      admin_reset_user_password: {
        Args: { new_password: string; user_email: string }
        Returns: Json
      }
      delete_client: { Args: { client_id: string }; Returns: boolean }
      get_current_user_admin_status: { Args: never; Returns: boolean }
      get_current_user_client_id: { Args: never; Returns: string }
      is_admin: { Args: { user_id: string }; Returns: boolean }
      update_document_description: {
        Args: { doc_id: string; new_description: string }
        Returns: boolean
      }
    }
    Enums: {
      acc_issue_status: "open" | "in_progress" | "resolved" | "ignored"
      acc_member_role: "owner" | "admin" | "developer" | "viewer"
      acc_plan: "starter" | "professional" | "agency" | "enterprise"
      acc_scan_status: "queued" | "running" | "completed" | "failed"
      acc_severity: "critical" | "high" | "medium" | "low"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      acc_issue_status: ["open", "in_progress", "resolved", "ignored"],
      acc_member_role: ["owner", "admin", "developer", "viewer"],
      acc_plan: ["starter", "professional", "agency", "enterprise"],
      acc_scan_status: ["queued", "running", "completed", "failed"],
      acc_severity: ["critical", "high", "medium", "low"],
    },
  },
} as const
