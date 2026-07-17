/** Avatar options: FIFA top-10 flags + Vietnam + cute animals */

export type AvatarKind = 'flag' | 'animal'

export type PlayerAvatar = {
  id: string
  name: string
  kind: AvatarKind
  /** ISO / flagcdn country code — only for flags */
  flagCode?: string
  emoji: string
  /** Soft pastel background for animal avatars */
  bg?: string
}

export const FLAG_AVATARS: PlayerAvatar[] = [
  { id: 'fr', name: 'Pháp', kind: 'flag', flagCode: 'fr', emoji: '🇫🇷' },
  { id: 'ar', name: 'Argentina', kind: 'flag', flagCode: 'ar', emoji: '🇦🇷' },
  { id: 'es', name: 'Tây Ban Nha', kind: 'flag', flagCode: 'es', emoji: '🇪🇸' },
  { id: 'gb', name: 'Anh', kind: 'flag', flagCode: 'gb', emoji: '🇬🇧' },
  { id: 'br', name: 'Brazil', kind: 'flag', flagCode: 'br', emoji: '🇧🇷' },
  { id: 'ma', name: 'Morocco', kind: 'flag', flagCode: 'ma', emoji: '🇲🇦' },
  { id: 'pt', name: 'Bồ Đào Nha', kind: 'flag', flagCode: 'pt', emoji: '🇵🇹' },
  { id: 'be', name: 'Bỉ', kind: 'flag', flagCode: 'be', emoji: '🇧🇪' },
  { id: 'nl', name: 'Hà Lan', kind: 'flag', flagCode: 'nl', emoji: '🇳🇱' },
  { id: 'mx', name: 'Mexico', kind: 'flag', flagCode: 'mx', emoji: '🇲🇽' },
  { id: 'vn', name: 'Việt Nam', kind: 'flag', flagCode: 'vn', emoji: '🇻🇳' },
]

export const ANIMAL_AVATARS: PlayerAvatar[] = [
  { id: 'bear', name: 'Gấu', kind: 'animal', emoji: '🐻', bg: '#FFE0B2' },
  { id: 'cat', name: 'Mèo', kind: 'animal', emoji: '🐱', bg: '#FFCCBC' },
  { id: 'dog', name: 'Chó', kind: 'animal', emoji: '🐶', bg: '#FFF9C4' },
  { id: 'tiger', name: 'Hổ', kind: 'animal', emoji: '🐯', bg: '#FFECB3' },
  { id: 'elephant', name: 'Voi', kind: 'animal', emoji: '🐘', bg: '#D1C4E9' },
  {
    id: 'penguin',
    name: 'Chim cánh cụt',
    kind: 'animal',
    emoji: '🐧',
    bg: '#B3E5FC',
  },
]

export const PLAYER_AVATARS: PlayerAvatar[] = [
  ...FLAG_AVATARS,
  ...ANIMAL_AVATARS,
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
