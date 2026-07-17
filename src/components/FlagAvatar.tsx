import {
  flagImageUrl,
  getAvatarById,
  type PlayerAvatar,
} from '@/constants/avatars'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-24 h-24',
  xl: 'w-40 h-40',
}

const emojiSizeMap: Record<Size, string> = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
}

export function FlagAvatar({
  avatarId,
  size = 'md',
  className = '',
  title,
}: {
  avatarId?: string | null
  size?: Size
  className?: string
  title?: string
}) {
  const avatar = getAvatarById(avatarId)

  if (avatar.kind === 'animal' || !avatar.flagCode) {
    return (
      <span
        className={`${sizeMap[size]} rounded-full shrink-0 inline-flex items-center justify-center border border-black/10 shadow-sm ${className}`}
        style={{ backgroundColor: avatar.bg || '#FFF4A4' }}
        title={title || avatar.name}
        aria-label={avatar.name}
      >
        <span className={`${emojiSizeMap[size]} leading-none select-none`}>
          {avatar.emoji}
        </span>
      </span>
    )
  }

  return (
    <span
      className={`${sizeMap[size]} rounded-full overflow-hidden bg-surface-container shrink-0 inline-flex items-center justify-center border border-black/10 shadow-sm ${className}`}
      title={title || avatar.name}
      aria-label={avatar.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={flagImageUrl(
          avatar.flagCode,
          size === 'xl' || size === 'lg' ? 160 : 80
        )}
        alt={avatar.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </span>
  )
}

export function AvatarOptionButton({
  avatar,
  selected,
  onSelect,
}: {
  avatar: PlayerAvatar
  selected: boolean
  onSelect: (id: string) => void
}) {
  const isAnimal = avatar.kind === 'animal' || !avatar.flagCode

  return (
    <button
      type="button"
      onClick={() => onSelect(avatar.id)}
      aria-pressed={selected}
      aria-label={avatar.name}
      className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all btn-press ${
        selected
          ? 'border-secondary-container ring-[3px] ring-secondary-container/30 scale-105'
          : 'border-[#CBD5CB] hover:border-primary/50'
      }`}
      style={isAnimal ? { backgroundColor: avatar.bg || '#FFF4A4' } : undefined}
    >
      {isAnimal ? (
        <span className="text-2xl leading-none select-none">{avatar.emoji}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={flagImageUrl(avatar.flagCode!, 80)}
          alt={avatar.name}
          className="w-full h-full object-cover"
        />
      )}
      {selected && (
        <span className="absolute inset-0 bg-secondary-container/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[18px] drop-shadow">
            check
          </span>
        </span>
      )}
    </button>
  )
}
