# Garden of Ancients Website

A beautiful, nature-inspired website for Garden of Ancients - Kenya's premier environmental learning space.

## 🌿 About

Garden of Ancients is an educational garden space in Nyansiongo, Nyamira County, Kenya, where ancient wisdom meets modern learning. We offer transformative experiences through:

- School & Environmental Learning
- Meetings & Picnics  
- Photography & Videography
- Conferencing
- Accommodation & Camping

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd garden-of-ancients
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
garden-of-ancients/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Landing page
│   ├── home/              # Home page
│   ├── about/             # About/Story page
│   ├── services/          # Services page
│   ├── booking/           # Booking page
│   ├── blog/              # Blog page
│   ├── testimonials/      # Testimonials page
│   ├── contact/           # Contact page
│   ├── camping/           # Camping page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   └── footer.tsx        # Footer component
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
\`\`\`

## 🎨 Design System

### Colors
- **Forest**: Primary greens for nature elements
- **Earth**: Warm browns for grounding
- **Sage**: Muted greens for accents
- **Soil**: Rich browns for text and backgrounds

### Typography
- **Headings**: Bold, nature-inspired
- **Body**: Clean, readable Inter font
- **Accents**: Rounded, friendly styling

## 🖼️ Images

Replace placeholder images in `/public/images/` with:
- Hero images showing students learning outdoors
- Service-specific photos for each offering
- Testimonial photos of real visitors
- Garden landscape and facility photos

## 📝 Content Updates

### Contact Information
Update in `app/contact/page.tsx` and `components/footer.tsx`:
- Phone numbers
- Email addresses  
- Physical address
- Operating hours

### Services & Pricing
Update in `app/services/page.tsx`:
- Service descriptions
- Pricing information
- Package details
- Availability

### Testimonials
Add real testimonials in `app/testimonials/page.tsx`:
- Customer quotes
- Photos
- Experience types
- Dates

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Customization

### Adding New Pages
1. Create new folder in `app/`
2. Add `page.tsx` file
3. Update navigation in `components/navigation.tsx`

### Styling Changes
- Update `tailwind.config.ts` for colors/themes
- Modify `app/globals.css` for global styles
- Use Tailwind classes for component styling

### Form Integration
Add form submission handling in:
- `app/contact/page.tsx` - Contact form
- `app/booking/page.tsx` - Booking form  
- `app/testimonials/page.tsx` - Testimonial form

## 📧 Contact

For questions about this website:
- Email: hello@gardenofancients.co.ke
- Phone: +254 700 123 456
- Location: Nyansiongo, Nyamira County, Kenya

## 📄 License

This project is proprietary to Garden of Ancients.
