src/
│
├── redux/
│   ├── store.ts
│   └── features/
│       └── tour/
│           ├── tourSlice.ts
│           ├── tourThunk.ts
│           ├── tourType.ts
│           └── tourSelector.ts   (optional but recommended)
│
├── lib/
│   └── axios.ts
│
├── app/ (Next.js App Router)
│   └── (admin)/
│       └── admin/
│           └── tours/
│               ├── page.tsx          # Tour list
│               ├── create/
│               │   └── page.tsx      # Create tour
│               ├── [id]/
│               │   ├── page.tsx      # Tour details
│               │   └── edit/
│               │       └── page.tsx  # Edit tour
│
├── components/
│   └── tour/
│       ├── TourCard.tsx
│       ├── TourForm.tsx
│       ├── TourTable.tsx
│       └── TourModal.tsx
│
└── hooks/
    └── reduxHooks.ts





    
 