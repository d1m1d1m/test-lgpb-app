import ComboBox from "./Combobox";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import LabelEditor from "./label-editor/LabelEditor";

export default function App()
{
  return(
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="number" placeholder="Code balance du produit" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" type="text" placeholder="Nom du produit" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Catégorie</Label>
        <ComboBox
          placeholder="Choisir une catégorie"
          name="category"
          options={[
            { label: "Fruits secs", value: '1' },
            { label: "Confiserie", value: '2' },
            { label: "Graines", value: '3' },
            { label: "Céréales", value: '4' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="recipe">Liste d'ingrédients</Label>
        <LabelEditor/>
      </div>
      
      <Button>Enregistrer</Button>
    </div>
  )
}