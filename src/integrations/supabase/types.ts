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
      [_ in never]: never
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
    Enums: {},
  },
} as const
