export interface EventSubCategory {
  label: string;
  value: string;
}

export const EVENT_SUBCATEGORIES: EventSubCategory[] = [
  { label: 'Bollywood', value: 'BOLLYWOOD' },
  { label: 'Techno', value: 'TECHNO' },
  { label: 'House', value: 'HOUSE' },
  { label: 'Hip-Hop', value: 'HIPHOP' },
  { label: 'EDM', value: 'EDM' },
  { label: 'Retro', value: 'RETRO' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Live', value: 'LIVE' },
  { label: 'Trance', value: 'TRANCE' },
  { label: 'Acoustic', value: 'ACOUSTIC' },
  { label: 'Deep House', value: 'DEEP_HOUSE' },
  { label: 'Afro Beats', value: 'AFRO_BEATS' },
  { label: 'Progressive', value: 'PROGRESSIVE' },
  { label: 'Indie', value: 'INDIE' },
  { label: 'Sufi', value: 'SUFI' },
  { label: 'Pop', value: 'POP' },
  { label: 'Rock', value: 'ROCK' },
  { label: 'R&B', value: 'RNB' },
  { label: 'Jazz', value: 'JAZZ' },
  { label: 'Live Band', value: 'LIVE_BAND' }
];


export interface EventCategory {
  label: string;
  value: string;
}

export const EVENT_CATEGORIES = [
  { label: 'Party', value: 'PARTY' },
  { label: 'Concert', value: 'CONCERT' },
  { label: 'Live Show', value: 'LIVE_SHOW' },
  { label: 'Ladies Night', value: 'LADIES_NIGHT' },
  { label: 'Techno Night', value: 'TECHNO_NIGHT' },
  { label: 'Open Mic', value: 'OPEN_MIC' },
  { label: 'Bollywood Night', value: 'BOLLYWOOD_NIGHT' },
  { label: 'Karaoke Night', value: 'KARAOKE_NIGHT' },
  { label: 'Comedy Show', value: 'COMEDY_SHOW' },
  { label: 'DJ Night', value: 'DJ_NIGHT' },
  { label: 'Pool Party', value: 'POOL_PARTY' },
  { label: 'Sundowner', value: 'SUNDOWNER' },
  { label: 'Festival Special', value: 'FESTIVAL_SPECIAL' },
  { label: 'Club Launch', value: 'CLUB_LAUNCH' },
  { label: 'After Party', value: 'AFTER_PARTY' },
  { label: 'Fashion Night', value: 'FASHION_NIGHT' },
  { label: 'Hip-Hop Night', value: 'HIPHOP_NIGHT' },
  { label: 'EDM Night', value: 'EDM_NIGHT' },
  { label: 'Themed Party', value: 'THEMED_PARTY' },
  { label: 'Silent Disco', value: 'SILENT_DISCO' }
];


export interface EventGenre {
  label: string;
  value: string;
}

export const EVENT_GENRES: EventGenre[] = [
  { label: 'EDM', value: 'EDM' },
  { label: 'Bollywood', value: 'BOLLYWOOD' },
  { label: 'Techno', value: 'TECHNO' },
  { label: 'Hip-Hop', value: 'HIPHOP' },
  { label: 'House', value: 'HOUSE' },
  { label: 'Pop', value: 'POP' },
  { label: 'Trance', value: 'TRANCE' },
  { label: 'Deep House', value: 'DEEP_HOUSE' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Progressive', value: 'PROGRESSIVE' },
  { label: 'Indie', value: 'INDIE' },
  { label: 'Rock', value: 'ROCK' },
  { label: 'R&B', value: 'RNB' },
  { label: 'Jazz', value: 'JAZZ' },
  { label: 'Funk', value: 'FUNK' },
  { label: 'Reggae', value: 'REGGAE' },
  { label: 'Soul', value: 'SOUL' },
  { label: 'Acoustic', value: 'ACOUSTIC' },
  { label: 'Sufi', value: 'SUFI' },
  { label: 'Live Band', value: 'LIVE_BAND' }
];


export interface EventCrowdType {
  label: string;
  value: string;
}

export const EVENT_CROWD_TYPES: EventCrowdType[] = [
  { label: 'Luxury', value: 'LUXURY' },
  { label: 'Corporate', value: 'CORPORATE' },
  { label: 'Young Professionals', value: 'YOUNG_PROFESSIONALS' },
  { label: 'Students', value: 'STUDENTS' },
  { label: 'Expats', value: 'EXPATS' },
  { label: 'Tourists', value: 'TOURISTS' },
  { label: 'Locals', value: 'LOCALS' },
  { label: 'Influencers', value: 'INFLUENCERS' },
  { label: 'Music Lovers', value: 'MUSIC_LOVERS' },
  { label: 'Couples', value: 'COUPLES' },
  { label: 'Singles', value: 'SINGLES' },
  { label: 'Party Enthusiasts', value: 'PARTY_ENTHUSIASTS' },
  { label: 'Socialites', value: 'SOCIALITES' },
  { label: 'Adventurous', value: 'ADVENTUROUS' },
  { label: 'Creative Crowd', value: 'CREATIVE_CROWD' }
];

export interface EventDressCode {
  label: string;
  value: string;
}

export const EVENT_DRESS_CODES: EventDressCode[] = [
  { label: 'Smart Casuals', value: 'SMART_CASUALS' },
  { label: 'Trendy Outfits', value: 'TRENDY_OUTFITS' },
  { label: 'No Shorts', value: 'NO_SHORTS' },
  { label: 'No Flip-flops', value: 'NO_FLIP_FLOPS' },
  { label: 'Clubwear', value: 'CLUBWEAR' },
  { label: 'Elegant/Formal', value: 'ELEGANT_FORMAL' },
  { label: 'Glam Night', value: 'GLAM_NIGHT' },
  { label: 'All Black', value: 'ALL_BLACK' },
  { label: 'Theme Based', value: 'THEME_BASED' },
  { label: 'Casual Chic', value: 'CASUAL_CHIC' },
  { label: 'Ethnic Night', value: 'ETHNIC_NIGHT' },
  { label: 'White Party', value: 'WHITE_PARTY' },
  { label: 'Cocktail Attire', value: 'COCKTAIL_ATTIRE' },
  { label: 'Street Style', value: 'STREET_STYLE' },
  { label: 'Fashion Forward', value: 'FASHION_FORWARD' }
];


export interface EventType {
  label: string;
  value: string;
  description?: string;
}

export const EVENT_TYPES: EventType[] = [
  { label: 'Paid', value: 'PAID', description: 'Ticketed or entry-fee-based event' },
  { label: 'Free', value: 'FREE', description: 'Free entry for all guests' },
  { label: 'Invite Only', value: 'INVITE', description: 'Exclusive events with guest list or private access' },
  { label: 'Members Only', value: 'MEMBERS', description: 'Access limited to club or community members' },
  { label: 'Private Party', value: 'PRIVATE', description: 'Closed-group or personal celebration events' }
];

