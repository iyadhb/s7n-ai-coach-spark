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
      assessment_questions: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at: string
          id: string
          order: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          required: boolean
          updated_at: string
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          order: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          required?: boolean
          updated_at?: string
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          order?: number
          question_text?: string
          question_type?: Database["public"]["Enums"]["question_type"]
          required?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      curated_resources: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          quiz_submission_id: string
          resource_type: string | null
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          quiz_submission_id: string
          resource_type?: string | null
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          quiz_submission_id?: string
          resource_type?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "curated_resources_quiz_submission_id_fkey"
            columns: ["quiz_submission_id"]
            isOneToOne: false
            referencedRelation: "quiz_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_analysis: {
        Row: {
          ai_market_trends_summary: string | null
          course_suggestions: Json | null
          created_at: string | null
          cv_storage_path: string
          id: string
          job_feed_data: Json | null
          parsed_education: Json | null
          parsed_experience: Json | null
          parsed_skills: Json | null
          quiz_submission_id: string
          skill_gaps: Json | null
          user_id: string | null
        }
        Insert: {
          ai_market_trends_summary?: string | null
          course_suggestions?: Json | null
          created_at?: string | null
          cv_storage_path: string
          id?: string
          job_feed_data?: Json | null
          parsed_education?: Json | null
          parsed_experience?: Json | null
          parsed_skills?: Json | null
          quiz_submission_id: string
          skill_gaps?: Json | null
          user_id?: string | null
        }
        Update: {
          ai_market_trends_summary?: string | null
          course_suggestions?: Json | null
          created_at?: string | null
          cv_storage_path?: string
          id?: string
          job_feed_data?: Json | null
          parsed_education?: Json | null
          parsed_experience?: Json | null
          parsed_skills?: Json | null
          quiz_submission_id?: string
          skill_gaps?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_analysis_quiz_submission_id_fkey"
            columns: ["quiz_submission_id"]
            isOneToOne: false
            referencedRelation: "quiz_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_options: {
        Row: {
          created_at: string
          id: string
          option_text: string
          order: number
          question_id: string
          sin_type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_text: string
          order: number
          question_id: string
          sin_type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          option_text?: string
          order?: number
          question_id?: string
          sin_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          id: string
          text: string
          track: Database["public"]["Enums"]["quiz_track"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          text: string
          track: Database["public"]["Enums"]["quiz_track"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          text?: string
          track?: Database["public"]["Enums"]["quiz_track"]
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string
          dominant_sin: Database["public"]["Enums"]["sin_type"]
          id: string
          sin_scores: Json
          track: Database["public"]["Enums"]["quiz_track"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dominant_sin: Database["public"]["Enums"]["sin_type"]
          id?: string
          sin_scores: Json
          track: Database["public"]["Enums"]["quiz_track"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dominant_sin?: Database["public"]["Enums"]["sin_type"]
          id?: string
          sin_scores?: Json
          track?: Database["public"]["Enums"]["quiz_track"]
          user_id?: string | null
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          ai_action_plan: Json | null
          ai_coaching_insight: string | null
          ai_focus_goal: string | null
          archetype_result: string | null
          context_ai_goals: string | null
          context_experience_years: number | null
          context_industry: string | null
          context_region: string | null
          context_role: string | null
          created_at: string | null
          id: string
          quiz_answers: Json | null
          user_email: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          ai_action_plan?: Json | null
          ai_coaching_insight?: string | null
          ai_focus_goal?: string | null
          archetype_result?: string | null
          context_ai_goals?: string | null
          context_experience_years?: number | null
          context_industry?: string | null
          context_region?: string | null
          context_role?: string | null
          created_at?: string | null
          id?: string
          quiz_answers?: Json | null
          user_email: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          ai_action_plan?: Json | null
          ai_coaching_insight?: string | null
          ai_focus_goal?: string | null
          archetype_result?: string | null
          context_ai_goals?: string | null
          context_experience_years?: number | null
          context_industry?: string | null
          context_region?: string | null
          context_role?: string | null
          created_at?: string | null
          id?: string
          quiz_answers?: Json | null
          user_email?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      result_templates: {
        Row: {
          created_at: string
          description: string
          id: string
          recommendation: string
          sin: Database["public"]["Enums"]["sin_type"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          recommendation: string
          sin: Database["public"]["Enums"]["sin_type"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          recommendation?: string
          sin?: Database["public"]["Enums"]["sin_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_assessment_questions: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      get_assessment_questions_by_type: {
        Args: { assessment_type_param: string }
        Returns: Json[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      assessment_type: "individual" | "business"
      question_type: "multiple_choice" | "single_select" | "likert_scale"
      quiz_track: "IND" | "BUZ"
      sin_type:
        | "pride"
        | "envy"
        | "wrath"
        | "sloth"
        | "greed"
        | "gluttony"
        | "lust"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_type: ["individual", "business"],
      question_type: ["multiple_choice", "single_select", "likert_scale"],
      quiz_track: ["IND", "BUZ"],
      sin_type: [
        "pride",
        "envy",
        "wrath",
        "sloth",
        "greed",
        "gluttony",
        "lust",
      ],
    },
  },
} as const
