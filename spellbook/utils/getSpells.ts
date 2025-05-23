import { getFirestore } from "firebase/firestore";
import { Spell } from "./spellType.ts";
import { collection, getDocs } from "firebase/firestore";

export const getSpells = async () => {
    const db = getFirestore();
    const data: Spell[] = [];
    try {
        

        const querySnapshot = await getDocs(collection(db, 'spells'));
        querySnapshot.forEach(documentSnapshot => {
          console.log('Document ID:', documentSnapshot.id, 'Data:', documentSnapshot.data());
          const spellData = documentSnapshot.data();
          data.push({
            id: documentSnapshot.id,
            name: spellData.name || '',
            level: spellData.level || '',
            school: spellData.school || '',
            castingTime: spellData.castingTime || '',
            spellRange: spellData.spellRange || '',
            components: spellData.components || '',
            duration: spellData.duration || '',
            description: spellData.description || '',
            higherLevels: spellData.higherLevels || '',
            isHomebrew: false
          });
        });
        console.log("All documents:", data);
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    return data;
}