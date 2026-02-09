export const FORM_CANDIDATURE = [
    {
        id: "entreprise",
        classNameLabel: "Entreprise",
        label: "Entreprise",
        type: "text",
        name: "entreprise",
        classNameInput: "entreprise",
        placeholder: "L'entreprise"
    },
    {
        id: "poste",
        classNameLabel: "Poste",
        label: "Poste",
        type: "text",
        name: "poste",
        classNameInput: "poste",
        placeholder: "Le poste"
    },
    {
        id: "lien",
        classNameLabel: "Lien",
        label: "Lien",
        type: "text",
        name: "lien",
        classNameInput: "lien",
        placeholder: "Le lien de l'offre"
    },
    {
        id: "statut",
        classNameLabel: "Statut",
        label: "Statut",
        type: "select",
        name: "statut",
        classNameInput: "statut-select",
        options: [
            { value: "Accepté", label: "Accepté" },
            { value: "En attente", label: "Attente" },
            { value: "Refusé", label: "Refusé" }
        ]
    },
]