/** Top 10 FIFA Men's World Ranking (World Cup 2026 live standings) */
export type PlayerAvatar = {
  id: string
  name: string
  /** ISO / flagcdn country code */
  flagCode: string
  emoji: string
}

export const PLAYER_AVATARS: PlayerAvatar[] = [
  { id: 'fr', name: 'Pháp', flagCode: 'fr', emoji: '🇫🇷' },
  { id: 'ar', name: 'Argentina', flagCode: 'ar', emoji: '🇦🇷' },
  { id: 'es', name: 'Tây Ban Nha', flagCode: 'es', emoji: '🇪🇸' },
  { id: 'gb', name: 'Anh', flagCode: 'gb', emoji: '🇬🇧' },
  { id: 'br', name: 'Brazil', flagCode: 'br', emoji: '🇧🇷' },
  { id: 'ma', name: 'Morocco', flagCode: 'ma', emoji: '🇲🇦' },
  { id: 'pt', name: 'Bồ Đào Nha', flagCode: 'pt', emoji: '🇵🇹' },
  { id: 'be', name: 'Bỉ', flagCode: 'be', emoji: '🇧🇪' },
  { id: 'nl', name: 'Hà Lan', flagCode: 'nl', emoji: '🇳🇱' },
  { id: 'mx', name: 'Mexico', flagCode: 'mx', emoji: '🇲🇽' },
  { id: 'vn', name: 'Việt Nam', flagCode: 'vn', emoji: '🇻🇳' },
]

export const DEFAULT_AVATAR_ID = 'vn'

export function getAvatarById(id: string | null | undefined): PlayerAvatar {
  return (
    PLAYER_AVATARS.find((a) => a.id === id) ??
    PLAYER_AVATARS.find((a) => a.id === DEFAULT_AVATAR_ID)!
  )
}

export function flagImageUrl(flagCode: string, width = 80): string {
  return `https://flagcdn.com/w${width}/${flagCode}.png`
}
