import { createClient } from "@supabase/supabase-js";
import { xml2json } from "./xml2json";

export async function getSupabase(messageNumber?: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_URL_SUPABASE ?? "",
      process.env.NEXT_PUBLIC_ANON_KEY_SUPABASE ?? ""
    );

    const { error: errauth } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_EMAIL_SUPABASE ?? "",
      password: process.env.NEXT_PUBLIC_PASSWORD_SUPABASE ?? "",
    });
    if (errauth) throw errauth;

    if (messageNumber) {
      const { error, data } = await supabase
        .from("rawDataXML")
        .select("xmlText")
        .eq("messageNumber", messageNumber)
        .single();
      if (error) throw error;

      return xml2json(data.xmlText);
    }

    const { error, data } = await supabase.from("rawDataXML").select();
    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
