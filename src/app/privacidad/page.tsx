import Card from "@/components/ui/Card";
import { PRIVACY_POLICY_TEXT } from "@/lib/constants";

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <Card className="border border-primary-100/50">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {PRIVACY_POLICY_TEXT}
        </div>
      </Card>
    </div>
  );
}
