import { BlogPost } from '@/types/blog'

// Temporary in-memory posts to get /blog working. Replace with real CMS/API later.
const demoPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'how-to-prepare-for-your-colive',
    title: 'How to Prepare for Your Coliving Stay at NomaVillage 🌿',
    excerpt: 'A short checklist to make the most of your time at NomaVillage — from room basics and work gear to beach life and community spirit.',
    content: `
      <p><strong>To make the most of your time with us, here’s a short checklist of what to bring and keep in mind before arriving:</strong></p>
      <ul>
        <li><strong>Essentials for your room:</strong> We provide a private ensuite, comfy double bed, desk, air-conditioning and heating. Bring your own toiletries and any personal comfort items you can’t live without.</li>
        <li><strong>Work setup:</strong> Coworking desks and high-speed WiFi are ready for you. Pack your laptop, chargers, and any accessories (mouse, headphones, extra monitor) that make working smooth.</li>
        <li><strong>Kitchen & food:</strong> Two shared kitchens are fully equipped, so you can cook anytime. Consider bringing your favorite snacks, spices, or special cooking tools.</li>
        <li><strong>Clothes for all occasions:</strong> Portugal can be sunny and warm, but evenings can cool down. Pack light clothing, a warm layer, swimwear, and comfy shoes.</li>
        <li><strong>Beach & outdoor gear:</strong> With the ocean and surf spots nearby, don’t forget sunscreen, towels, water bottle, or your surf gear if you have it.</li>
        <li><strong>Community spirit:</strong> NomaVillage thrives on connection. Come with an open mind, ready to share, respect communal spaces, and join events like yoga, dinners, or surf trips.</li>
        <li><strong>Practicalities:</strong> Bring euros for local markets, check your travel to Lagos in advance, and make sure your phone plan works in Portugal (or grab a local SIM).</li>
        <li><strong>Backups:</strong> A power bank, offline playlists, or the ability to hotspot from your phone can be helpful during rare WiFi hiccups.</li>
      </ul>
      <p>✨ With these basics covered, you’ll be ready to dive into coliving life—balancing work, wellness, and community by the sea.</p>
    `,
    author: { name: 'Noma Village Team' },
    tags: ['Guide', 'Travel'],
    category: 'Tips',
    featured_image: '/images/cliff2.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    read_time: 3,
    is_featured: true,
  },
  {
    id: 3,
    slug: 'finding-your-tribe',
    title: 'Finding Your Tribe',
    excerpt: 'How coliving creates meaningful connections in a digital world — beyond screens, into real community.',
    content: `
      <h2>Finding Your Tribe — How Coliving Creates Meaningful Connections in a Digital World</h2>
      <strong>Real connection beats notifications.</strong> In an age where we're more "connected" than ever through screens, many remote workers and digital nomads still feel isolated.
      <br><br>
      You might be crushing it professionally, jumping on Zoom across time zones — but when you close your laptop, it's quiet. <strong>Coliving changes that</strong> by turning proximity into community and routine into shared experience.
      <br><br>

      <h3>The Loneliness Epidemic Among Remote Workers</h3>
      <strong>Freedom came with a hidden cost.</strong> Remote work unlocked location independence, but it also amplified disconnection.
      <br><br>
      When colleagues are pixels and your office is wherever your laptop opens, <strong>building genuine relationships is hard</strong>.
      <br><br>
      Traditional alternatives fall short: coffee shops are transient, apartments are isolating, and coworking offers proximity without the depth that comes from <em>sharing life</em> together.
      <br><br>

      <h3>Why Coliving Is Different</h3>
      <strong>It's not roommates — it's intentional community.</strong> At Nomavillage, people actively choose connection, growth, and shared experiences.
      <br><br>
      <strong>The magic happens in the in‑between moments:</strong> a spontaneous lunch that becomes a collaboration. A sunset walk that shifts your perspective. A communal dinner where strangers become friends who genuinely care.
      <br><br>

      <h3>The Balance of Community and Solitude</h3>
      <strong>Connection and privacy can coexist.</strong> Great coliving respects both.
      <br><br>
      Your private room is your sanctuary for deep work and recharge. When you're ready to engage, there are coworking areas buzzing with energy, welcoming kitchens, and living rooms designed for easy, organic interaction.
      <br><br>
      <strong>You choose your level of engagement daily.</strong> Join the beach crew, or slip into focus mode. The culture respects both.
      <br><br>

      <h3>Building Relationships That Travel With You</h3>
      <strong>Community becomes a global network.</strong> Friends you make today become collaborators, clients, and couches to crash on around the world.
      <br><br>
      Join Nomavillage and you're not just finding housemates — you're plugging into a worldwide tribe of conscious, growth‑oriented people.
      <br><br>

      <h3>The Ripple Effect of Intentional Community</h3>
      <strong>Community rewires how you show up.</strong> Competition softens into collaboration. Courage becomes contagious. You're supported in the pursuit of what matters.
      <br><br>
      The habits and mindsets you build here travel with you. Often, you’ll find yourself seeking — or creating — similar spaces wherever you go.
      <br><br>

      <h3>Making the Leap</h3>
      <strong>Ask yourself:</strong> Are you done with isolation? Craving real conversations? Ready to live where people know your name and care about your dreams?
      <br><br>
      Whether you want a two‑week reset or a longer‑term base, <strong>coliving meets you where you are</strong> and nourishes every part of you — professional, personal, and spiritual.
      <br><br>
      In an increasingly digital world, choosing coliving is choosing human connection. It's a practical, beautiful way to do life alongside others who are also figuring it out — together.
    `,
    author: { name: 'Noma Village Team' },
    tags: ['Community', 'Mindset'],
    category: 'Community',
    featured_image: '/images/balcony2.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    read_time: 6,
  },
  {
    id: 4,
    slug: 'ultimate-work-life-integration-lagos-portugal-remote-workers',
    title: 'The Ultimate Work-Life Integration - Why Lagos, Portugal Is Perfect for Remote Workers',
    excerpt: 'Work-life balance is out. Integration is in. Here’s why Lagos, Portugal — paired with community at NomaVillage — is the ideal place to let work and life flow together.',
    content: `
      <h2>The Ultimate Work-Life Integration - Why Lagos, Portugal Is Perfect for Remote Workers</h2>
      <p>Work-life balance is dead. Long live work-life integration. For remote workers and digital nomads, the traditional 9-to-5 boundaries have dissolved, creating both a challenge and an opportunity. The question is no longer about balancing work and life as separate spheres — it's about finding a location and lifestyle that allows them to flow together naturally.</p><br><br>

      <h3>Beyond Balance: Understanding Integration</h3>
      <p>Work-life balance implies a zero-sum game: more of one means less of the other. But remote workers know the reality is more nuanced. Some days you're in deep flow until 9 PM. Other days you surf at 2 PM and answer emails over dinner. The key isn't rigid boundaries — it's finding an environment that supports this fluid way of living.</p><br><br>
      <p>Lagos, Portugal offers exactly this kind of environment. With over 300 sunny days per year and mild winters, the weather alone transforms how you structure your day. You're not confined to indoor spaces or limited by seasonal depression. The sun is your constant companion, inviting you to integrate movement, nature, and fresh air into your work routine.</p><br><br>

      <h3>The Geography of Productivity</h3>
      <p>Location matters more than we often acknowledge. Your physical environment affects your mental state, creativity, and productivity in profound ways. Lagos offers a unique combination that's hard to find elsewhere.</p><br><br>
      <p>The beaches aren't just beautiful — they're functional. Need to clear your head before a big client call? A 20-minute walk along the shore does wonders. Stuck on a problem? The rhythmic sound of waves can shift your thinking from analytical to creative. That 3 PM energy dip? A quick swim recharges you better than any coffee.</p><br><br>
      <p>The stunning rock formations and coastal cliffs provide natural beauty that never gets old. Living somewhere beautiful isn't a luxury — it's an investment in your mental health and creative capacity. When you look out your window and see beauty, it changes how you approach your work and your life.</p><br><br>

      <h3>The Rhythm of a Working Day in Lagos</h3>
      <p>Imagine this: You wake up naturally with the sun. You grab your coffee and laptop, settling into one of Nomavillage's coworking spaces. The morning is for deep work — those 3–4 hours when your mind is sharpest and you tackle the most challenging tasks.</p><br><br>
      <p>Around noon, hunger hits and you take a break. Someone's cooking in the communal kitchen, and the smell is too good to resist. Lunch becomes a spontaneous gathering — a mix of people from different countries, working on different projects, but all appreciating the simple pleasure of a shared meal.</p><br><br>
      <p>The afternoon might mean more work, but it could also mean a beach break. In traditional office culture, this flexibility would be impossible. But in Lagos, with Nomavillage as your base, you can structure your day around both productivity and pleasure. Your colleague back in New York isn't online yet anyway, so why not take advantage of the 68-degree sunshine?</p><br><br>
      <p>Evenings are for connection. Maybe you join the group heading into the old town for dinner. Maybe you stay in and someone suggests an impromptu jam session or philosophical discussion. The boundary between "work time" and "life time" doesn't feel restrictive here — it feels natural.</p><br><br>

      <h3>The Side Season Secret</h3>
      <p>While summer in the Algarve attracts tourists and families, the side seasons (fall and spring) attract something special: a conscious community of remote workers, digital nomads, and location-independent entrepreneurs. These are people who've optimized their lives for freedom and experiences rather than following the traditional path.</p><br><br>
      <p>This timing creates a unique energy. You're not surrounded by vacationers — you're surrounded by people who are building businesses, creating art, coaching clients, or working on projects that matter to them. The conversations go deeper. The connections are more meaningful. Everyone's there intentionally, not just for a quick holiday.</p><br><br>

      <h3>The Creative Advantage</h3>
      <p>Creativity doesn't happen on command. It emerges when your nervous system is relaxed, when you're exposed to new stimuli, and when you're in environments that inspire rather than drain you. Lagos checks all these boxes.</p><br><br>
      <p>The mix of Portuguese culture, international community, ocean environment, and year-round sunshine creates a creative cocktail that's hard to replicate. You'll find yourself having ideas in the shower, insights during beach walks, and breakthroughs during casual conversations with fellow residents.</p><br><br>
      <p>Many remote workers report that their best work happens not during scheduled work hours but during those in-between moments — the walk between spaces, the conversation over coffee, the quiet evening reflection. Lagos and Nomavillage create abundant space for these moments.</p><br><br>

      <h3>Practical Perks That Matter</h3>
      <p>Beyond the lifestyle benefits, Lagos offers practical advantages for remote workers. Portugal has excellent internet infrastructure, so connectivity isn't a concern. The cost of living is reasonable compared to other Western European destinations, allowing your remote income to stretch further.</p><br><br>
      <p>The time zone (GMT/WET) works beautifully if you have clients or colleagues in the Americas, Europe, or even parts of Africa. You can start your day early to catch East Coast morning hours or work later to overlap with West Coast afternoons.</p><br><br>
      <p>Portugal also offers attractive visa options for remote workers and digital nomads, including the D7 visa and digital nomad visa, making it easier to stay longer term if Lagos captures your heart.</p><br><br>

      <h3>Community Amplifies Everything</h3>
      <p>All of these location benefits are amplified when you're part of a community like Nomavillage. You're not figuring out Lagos alone — you have instant access to people who know the best beaches, the hidden gems, the reliable cafes with good wifi. Someone always knows where to get fresh vegetables, which restaurants are worth it, or when the next local festival is happening.</p><br><br>
      <p>More importantly, you have accountability and inspiration built into your daily life. When everyone around you is working on meaningful projects, it raises your game. When you see someone else pushing through challenges, it motivates you to do the same. Community doesn't just make life more enjoyable — it makes you more effective.</p><br><br>

      <h3>The Integration You've Been Seeking</h3>
      <p>Work-life integration isn't about working less or playing more. It's about creating a life where work feels meaningful because it funds the lifestyle you want, and the lifestyle you want supports the work you do. It's about being in a place where both parts of your life can thrive simultaneously.</p><br><br>
      <p>Lagos offers the environment. Nomavillage offers the community. Together, they create the conditions for the kind of integrated, intentional life that more and more remote workers are seeking. Not because it's easy, but because it's real. Not because it's perfect, but because it's alive.</p><br><br>
      <p>If you're tired of treating your remote work lifestyle as a compromise — a trade-off between professional success and personal fulfillment — maybe it's time to try integration instead. And maybe Lagos is exactly where that integration begins.</p><br><br>
    `,
    author: { name: 'Noma Village Team' },
    tags: ['Remote Work', 'Lifestyle', 'Portugal'],
    category: 'Lifestyle',
    featured_image: '/images/beach2.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    read_time: 8,
    is_featured: false,
    meta_title: 'Work-Life Integration in Lagos, Portugal for Remote Workers | NomaVillage',
    meta_description: 'Why Lagos, Portugal is the perfect base for remote workers seeking true work-life integration — sunshine, community, productivity, and lifestyle at NomaVillage.',
  },
  {
    id: 5,
    slug: 'conscious-living-meets-modern-work-the-spiritual-side-of-coliving',
    title: 'Conscious Living Meets Modern Work - The Spiritual Side of Coliving',
    excerpt:
      "How conscious living and intentional community transform remote work into a pathway for personal and spiritual growth.",
    content: `
      <h2>Conscious Living Meets Modern Work - The Spiritual Side of Coliving</h2>
      <p>There's a quiet revolution happening in how people choose to live and work. It's not just about remote work flexibility or travel opportunities. It's about something deeper — a conscious choice to align how we live with who we want to become. Welcome to the intersection of conscious living and modern coliving.</p><br><br>

      <h3>The Awakening of Remote Workers</h3>
      <p>Something interesting happens when you break free from the traditional office grind. Initially, you celebrate the freedom — no commute, no dress code, work from anywhere. But after the novelty wears off, many remote workers find themselves asking bigger questions: What's the point of all this freedom if I'm not growing as a person? What's the value of flexibility if I'm not using it intentionally?</p><br><br>
      <p>This awakening leads people to seek more than just a place to work remotely. They're searching for environments that support not just their professional goals but their personal and spiritual evolution. They're looking for community that goes beyond networking — community that nourishes the soul.</p><br><br>

      <h3>What Conscious Living Actually Means</h3>
      <p>Conscious living isn't about adopting a specific set of beliefs or practices. It's about awareness — showing up intentionally to your life rather than operating on autopilot. It's about recognizing that how you live matters as much as what you accomplish.</p><br><br>
      <p>In practice, this might mean different things to different people. For some, it's a daily meditation practice. For others, it's being mindful about what they consume — food, media, energy. For many, it's about choosing connection over isolation, growth over comfort, and purpose over profit.</p><br><br>
      <p>What unites conscious individuals is a commitment to self-awareness and continuous evolution. They're not content with just existing — they want to live with intention and create positive ripples in the world around them.</p><br><br>

      <h3>Why Environment Matters for Growth</h3>
      <p>Your environment is not neutral. It either supports your growth or hinders it. Living alone in a regular apartment while working remotely can work, but it rarely inspires transformation. You can maintain your existing habits and patterns, but breaking through to new levels requires different conditions.</p><br><br>
      <p>Coliving spaces designed around conscious community create a container for growth. At Nomavillage, you're surrounded by people who are also committed to personal development and spiritual exploration. This creates a field of possibility — what one person discovers becomes available to everyone.</p><br><br>
      <p>When someone shares a practice that's changed their life, you're inspired to try it. When someone pushes through a fear or makes a brave choice, it gives you permission to do the same. When someone shows up authentically, flaws and all, it invites you to drop your masks too.</p><br><br>

      <h3>The Power of Shared Spiritual Practice</h3>
      <p>While each person's spiritual journey is unique, there's something powerful about having a community that respects and supports that journey. Imagine starting your morning with optional meditation in a shared space, surrounded by others who value that practice. Or having deep conversations about meaning and purpose over dinner, with people who won't look at you like you're strange.</p><br><br>
      <p>At Nomavillage, spiritual growth isn't separate from daily life — it's woven into it. The community spaces become temples. The shared meals become rituals. The honest conversations become teachings. You're not going to a meditation retreat for a week and then returning to "normal life" — you're living in a way where the sacred and the mundane are integrated.</p><br><br>
      <p>This doesn't mean everything is serious or heavy. Often, the most profound spiritual moments come through play, laughter, and simple human connection. It's the joy of cooking together. The silliness of a spontaneous dance party. The vulnerability of sharing what you're struggling with and being met with compassion.</p><br><br>

      <h3>Individual Practice in Community Context</h3>
      <p>One of the beautiful tensions in conscious coliving is balancing individual practice with communal experience. You need both. You need time alone for reflection, meditation, journaling, or whatever practices feed your soul. But you also need community to challenge your blind spots, celebrate your breakthroughs, and remind you that you're not alone on this journey.</p><br><br>
      <p>Having a private room within a communal setting provides exactly this balance. Your room becomes your sacred space — a place for morning pages, meditation, yoga, or simply sitting with yourself. When you emerge, the community is there to engage with, but you've had that essential time to ground yourself first.</p><br><br>
      <p>This rhythm of solitude and connection mirrors the rhythm of breath — the inhale and exhale, both necessary, both valuable. Neither could exist without the other.</p><br><br>

      <h3>Conscious Entrepreneurship and Purpose-Driven Work</h3>
      <p>Many residents at coliving spaces like Nomavillage aren't just working remote jobs — they're building businesses, coaching clients, creating content, or launching projects aligned with their values. This is conscious entrepreneurship: work that serves both financial needs and spiritual purpose.</p><br><br>
      <p>Being around others doing the same creates a powerful synergy. You realize you don't have to choose between making money and making meaning. You see living examples of people who've figured out how to do both. You get practical support — feedback on your ideas, collaboration opportunities, skills sharing — but also emotional and spiritual support for the inevitable challenges of doing work that matters.</p><br><br>
      <p>The community becomes an incubator not just for businesses but for purpose-driven lives. Someone's courage to quit their corporate job and follow their passion gives you courage to do the same. Someone's struggle with imposter syndrome helps you recognize you're not alone in yours. Someone's celebration of a big win reminds you to acknowledge your own progress.</p><br><br>

      <h3>The Ripple Effect of Conscious Community</h3>
      <p>When you live in a conscious community, you can't help but elevate your consciousness. The collective field pulls you up. You become more aware of your patterns, more honest about your shadows, more committed to your growth. Not because anyone's forcing you, but because that's what happens when you're surrounded by people who are doing their own work.</p><br><br>
      <p>This ripple effect extends beyond your time in the community. The practices you develop, the awareness you cultivate, the connections you forge — these become part of who you are. You carry the spirit of conscious living with you wherever you go next. You become a source of that same energy for others.</p><br><br>
      <p>Many people report that their time in a conscious coliving space marks a before and after in their lives. There's who they were before they experienced this way of living, and who they became after. Not because anything dramatic happened, but because daily immersion in conscious community creates gradual, profound transformation.</p><br><br>

      <h3>An Invitation to Alignment</h3>
      <p>If you've been feeling a disconnect between how you're living and who you want to be, you're not alone. If you're craving community that goes deeper than surface-level interactions, that hunger is valid. If you sense there's more to life than productivity and achievement, you're right.</p><br><br>
      <p>Conscious coliving spaces like Nomavillage exist for people like you — people who want more. Not more stuff or more success in the conventional sense, but more alignment, more authenticity, more connection, more growth, more meaning.</p><br><br>
      <p>It's not for everyone, and that's okay. It requires vulnerability to live in community. It requires courage to prioritize growth over comfort. It requires openness to being changed by the people around you. But if you're ready for that, if you're seeking that, spaces like this exist to support your journey.</p><br><br>
      <p>The invitation is simple: come as you are, bring your whole self — your ambitions and your anxieties, your strengths and your struggles, your purpose and your questions. Come ready to support others and be supported in return. Come prepared to work hard on your projects and equally hard on yourself. Come open to the possibility that this could be exactly what your soul has been searching for.</p><br><br>
      <p>In a world that often feels disconnected and spiritually bankrupt, conscious coliving offers an alternative. It's not an escape from reality — it's a more intentional way of engaging with it. It's choosing to live in alignment with your values, surrounded by people doing the same, in a place that nourishes mind, body, and soul.</p><br><br>
      <p>The question isn't whether conscious coliving is right for you. The question is: are you ready to live more consciously? If the answer is yes, places like Nomavillage are waiting.</p>
    `,
    author: { name: 'Noma Village Team' },
    tags: ['Conscious Living', 'Spirituality', 'Community', 'Remote Work'],
    category: 'Lifestyle',
    featured_image: '/images/yoga.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    read_time: 9,
    is_featured: false,
    meta_title: 'Conscious Living Meets Modern Work | Spiritual Side of Coliving',
    meta_description:
      'Explore how conscious living and intentional community elevate modern remote work into a journey of spiritual growth at NomaVillage.',
  },
]

export class BlogService {
  static async getPosts({ per_page }: { per_page?: number }) {
    const posts = [...demoPosts].sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
    return { posts: per_page ? posts.slice(0, per_page) : posts }
  }

  static async getPostBySlug(slug: string) {
    return demoPosts.find((p) => p.slug === slug) || null
  }

  static async getRelatedPosts(post: BlogPost) {
    const related = demoPosts.filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)))
    return related.slice(0, 3)
  }
}
