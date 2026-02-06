# LED Gala 2K25

Projet d'animations paramétrables pour mur de LED, contrôlées via une interface graphique web. Le système permet de projeter des effets visuels dynamiques sur un mur de LED branché en HDMI.

## Description

Cette application web permet de créer et contrôler des animations visuelles en temps réel pour un affichage LED. L'interface graphique offre un contrôle complet sur les effets, leur position, et leurs paramètres.

## Démo en ligne

https://romainbourdain.github.io/led-gala-2k25

## Fonctionnalités

### Effets disponibles
- **Couleur unie** : Affichage d'une couleur solide personnalisable
- **Gradient** : Dégradés de couleurs avec contrôle de direction et de couleurs
- **Feu** : Animation de flammes réalistes
- **Neige** : Effet de chute de neige animée
- **Image** : Affichage d'images personnalisées
- **Son** : Visualiseur audio réactif au son

### Contrôles de position
- **Position X/Y** : Contrôle précis de la position de la zone de rendu
- **Dimensions** : Ajustement de la largeur et hauteur
- **Rotation** : Support de rotations à 0°, 90°, -90°, et 180°

### Interface
- Zone de capture redimensionnable et déplaçable
- Prévisualisation en temps réel
- Paramètres configurables pour chaque effet
- Interface responsive avec onglets pour organiser les effets

## Installation

### Prérequis
- Node.js 20+
- pnpm (recommandé) ou npm

### Installation des dépendances

```bash
pnpm install
```

ou

```bash
npm install
```

## Utilisation

### Mode développement

```bash
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
pnpm build
```

Les fichiers compilés seront dans le dossier `dist/`

### Prévisualisation du build

```bash
pnpm preview
```

## Configuration pour mur de LED

1. **Connecter l'écran LED** via HDMI à l'ordinateur
2. **Ouvrir l'application** dans un navigateur en mode plein écran (F11)
3. **Configurer la zone de rendu** :
   - Ajuster X et Y pour positionner la zone visible
   - Définir Width et Height selon les dimensions du mur LED
   - Choisir la rotation si nécessaire (0°, 90°, -90°, 180°)
4. **Sélectionner un effet** dans les onglets disponibles
5. **Ajuster les paramètres** de l'effet selon vos besoins

### Conseils d'utilisation
- Utilisez les coordonnées X=0 et Y=0 pour aligner le coin supérieur gauche de la zone de rendu
- La rotation maintient toujours le point (X, Y) au coin visible en haut à gauche
- Pour des performances optimales, utilisez un navigateur basé sur Chromium (Chrome, Edge)

## Technologies utilisées

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Radix UI** - Composants UI accessibles

## Déploiement

Le projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

### Déploiement manuel

```bash
pnpm deploy
```

## Structure du projet

```
led-gala-2k25/
├── src/
│   ├── components/       # Composants React
│   │   ├── capture-zone.tsx   # Zone de rendu principale
│   │   ├── effect-canvas.tsx  # Canvas pour les effets
│   │   ├── settings.tsx       # Paramètres de position
│   │   └── ui/                # Composants UI réutilisables
│   ├── effets/           # Effets visuels
│   │   ├── fire.tsx
│   │   ├── gradient.tsx
│   │   ├── image.tsx
│   │   ├── snow.tsx
│   │   ├── solid-color.tsx
│   │   └── sound.tsx
│   ├── settings-store.ts # Store Zustand pour les paramètres
│   └── App.tsx           # Composant principal
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD GitHub Actions
└── public/               # Assets statiques
```

## Développement

### Ajouter un nouvel effet

1. Créer un nouveau fichier dans `src/effets/`
2. Implémenter l'interface `Effet` avec les méthodes `draw()` et `settings()`
3. Ajouter l'effet au tableau dans `src/effets/effets.ts`

### Format d'un effet

```typescript
export const monEffet: Effet = {
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Logique de rendu
  },
  settings: () => (
    <div>
      {/* Composants de paramètres */}
    </div>
  ),
};
```

## Licence

Projet privé - Tous droits réservés

## Auteur

Romain Bourdain
