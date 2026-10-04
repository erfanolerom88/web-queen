# Master Build Plan — Four Parts, Under One Month  
  
> **Overview document**  
>  
> Each part has its own detailed pipeline. This document ties them together and gives the combined schedule.  
  
---  
  
## The Four Parts  
  
| # | Part | Doc | What it is |  
|---|---|---|---|  
| 1 | **Strapi (Backend/CMS)** | — | Installed, not built. Content backend + built-in admin dashboard, used internally by your team for general content such as pages and blog posts. No custom dashboard needed — Strapi's own React admin covers this. |  
| 2 | **UI Library** | `sveltekit-ui-library-pipeline.md` | SvelteKit component library with GSAP animation, particles/shaders, voxel/low-poly 3D via Threlte, and shadcn-svelte as the component base. |  
| 3 | **Studio** | `studio-page-designer-pipeline.md` | Internal visual page builder with flex/stack layout, drag-and-drop, and property panel, plus a restricted customer-facing editor mode for content-only edits. |  
| 4 | **Commerce Module** | `commerce-module-pipeline.md` | Medusa.js backend (integrated, not built) + `commerce-ui` package for product, cart, and checkout UI. |  
| — | **SEO** | Threaded through Parts 2, 3 & 4 | `packages/seo`, Studio's page-level meta panel, pro... |  
  
---  
  
## Architecture Overview  
  
The system is divided into four major parts:  
  
1. **Strapi**  
- Content backend  
- CMS  
- Internal content management  
- Blog and general pages  
- Uses Strapi's built-in React admin  
- No custom CMS dashboard required  
  
2. **UI Library**  
- SvelteKit component system  
- GSAP animations  
- Particles and shaders  
- Threlte-based 3D  
- Voxel / low-poly components  
- shadcn-svelte as the component foundation  
  
3. **Studio**  
- Internal visual page designer  
- Flex / stack-based layouts  
- Drag-and-drop editing  
- Property panel  
- Customer-facing restricted editor  
- Content-only editing for customers  
  
4. **Commerce Module**  
- Medusa.js backend  
- Commerce integration  
- `commerce-ui` package  
- Product UI  
- Cart UI  
- Checkout UI  
  
---  
  
## SEO  
  
SEO is not treated as a completely separate part of the system.  
  
Instead, SEO capabilities are threaded through:  
  
- **Part 2 — UI Library**  
- **Part 3 — Studio**  
- **Part 4 — Commerce Module**  
  
Relevant areas include:  
  
- `packages/seo`  
- Studio's page-level meta panel  
- Product/page SEO capabilities  
- Additional SEO functionality defined by the individual pipelines  
  
---  
  
## Related Pipeline Documents  
  
The Master Build Plan connects the following detailed pipeline documents:  
  
### UI Library  
  
`[[sveltekit-ui-library-pipeline]]`  
  
Contains the detailed implementation pipeline for the SvelteKit component library.  
  
### Studio  
  
`[[studio-page-designer-pipeline]]`  
  
Contains the detailed implementation pipeline for the visual page builder and customer editor.  
  
### Commerce  
  
`[[commerce-module-pipeline]]`  
  
Contains the detailed implementation pipeline for the commerce system.  
  
---  
  
## Combined Build Structure  
  
`` ` ``text  
MASTER BUILD PLAN  
│  
├── 1. Strapi  
│ ├── Backend / CMS  
│ ├── Content  
│ ├── Pages  
│ ├── Blog  
│ └── Built-in React Admin  
│  
├── 2. UI Library  
│ ├── SvelteKit  
│ ├── shadcn-svelte  
│ ├── GSAP  
│ ├── Particles  
│ ├── Shaders  
│ └── Threlte  
│ └── Voxel / Low-Poly 3D  
│  
├── 3. Studio  
│ ├── Visual Page Builder  
│ ├── Flex / Stack Layout  
│ ├── Drag & Drop  
│ ├── Property Panel  
│ └── Customer Editor  
│ └── Content-Only Mode  
│  
├── 4. Commerce Module  
│ ├── Medusa.js  
│ ├── commerce-ui  
│ ├── Products  
│ ├── Cart  
│ └── Checkout  
│  
└── SEO  
├── packages/seo  
├── Studio Meta Panel  
└── Commerce / Product SEO
