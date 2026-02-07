import Card from "@/components/ui/Card";
import { TERMS_AND_CONDITIONS_TEXT } from "@/lib/constants";

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <Card className="border border-primary-100/50">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Términos y Condiciones</h1>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {TERMS_AND_CONDITIONS_TEXT}
        </div>
      </Card>
    </div>
  );
}
