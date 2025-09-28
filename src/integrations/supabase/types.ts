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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ayahs: {
        Row: {
          audio_url: string | null
          ayah_number: number
          created_at: string | null
          id: number
          reciter_id: number | null
          surah_id: number
          text_ar: string
        }
        Insert: {
          audio_url?: string | null
          ayah_number: number
          created_at?: string | null
          id?: number
          reciter_id?: number | null
          surah_id: number
          text_ar: string
        }
        Update: {
          audio_url?: string | null
          ayah_number?: number
          created_at?: string | null
          id?: number
          reciter_id?: number | null
          surah_id?: number
          text_ar?: string
        }
        Relationships: [
          {
            foreignKeyName: "ayahs_reciter_id_fkey"
            columns: ["reciter_id"]
            isOneToOne: false
            referencedRelation: "reciters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ayahs_surah_id_fkey"
            columns: ["surah_id"]
            isOneToOne: false
            referencedRelation: "surahs"
            referencedColumns: ["id"]
          },
        ]
      }
      reciters: {
        Row: {
          created_at: string | null
          id: number
          identifier: string
          language_code: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          identifier: string
          language_code?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          identifier?: string
          language_code?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      surahs: {
        Row: {
          ayah_count: number
          created_at: string | null
          id: number
          name_ar: string
          name_en: string
          revelation_place: string
        }
        Insert: {
          ayah_count: number
          created_at?: string | null
          id?: number
          name_ar: string
          name_en: string
          revelation_place: string
        }
        Update: {
          ayah_count?: number
          created_at?: string | null
          id?: number
          name_ar?: string
          name_en?: string
          revelation_place?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          ayah_id: number
          created_at: string | null
          id: number
          language_code: string
          text_translated: string
          translator_name: string | null
        }
        Insert: {
          ayah_id: number
          created_at?: string | null
          id?: number
          language_code?: string
          text_translated: string
          translator_name?: string | null
        }
        Update: {
          ayah_id?: number
          created_at?: string | null
          id?: number
          language_code?: string
          text_translated?: string
          translator_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translations_ayah_id_fkey"
            columns: ["ayah_id"]
            isOneToOne: false
            referencedRelation: "ayahs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_surah_with_translations: {
        Args: { lang_code?: string; surah_id_param: number }
        Returns: {
          ayah_number: number
          ayah_text_ar: string
          surah_name: string
          surah_name_ar: string
          translation: string
        }[]
      }
      search_quran: {
        Args: { lang?: string; search_term: string }
        Returns: {
          ayah_number: number
          ayah_text: string
          rank: number
          surah_name: string
          surah_name_ar: string
          translation: string
        }[]
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
