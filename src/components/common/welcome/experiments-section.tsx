import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import s from './welcome.module.css'

export type ExperimentsSectionProps = {
  experiments: {
    number: number
    title: string
    href: string
    tags: string[]
    contributors: {
      id: string
      url: string
      name: string
      avatarUrl: string
      email: string
      company: string
    }[]
  }[]
}

const ExperimentsSection: FC<ExperimentsSectionProps> = ({
  experiments
}: ExperimentsSectionProps) => {
  const [tagFilters, setTagFilters] = useState<string[]>([])
  const filteredExperiments = experiments.filter(({ tags }) => {
    const match =
      tagFilters.length === 0 ||
      tagFilters.every((tag) => {
        return tags.includes(tag)
      })
    return match
  })

  const handleTagClick = (tag: string) => {
    if (tagFilters.includes(tag)) {
      setTagFilters(tagFilters.filter((t) => t !== tag))
    } else {
      setTagFilters([...tagFilters, tag])
    }
  }

  return (
    <>
      <div className={s.experimentsHeader}>
        <h3 className={clsx(s.header, s.noMargin)}>Experiments</h3>
        <div className={s.tags}>
          {tagFilters.map((tag) => (
            <button
              key={tag}
              className={clsx(s.tag, s.activeTag)}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className={clsx(s.box, s.noPadding)}>
        <ol>
          {filteredExperiments.map(
            ({ title, href, tags, contributors, number }) => (
              <li className={s.boxEntry} key={href}>
                <div className={s.experimentInner}>
                  <div className={s.info}>
                    <Link href={href}>
                      <span className={s.leftSign}>{number}</span>
                      <h4>{title}</h4>
                    </Link>
                  </div>

                  <div className={s.tags}>
                    {tags.map((tag) => (
                      <button
                        onClick={() => handleTagClick(tag)}
                        key={tag}
                        className={clsx(s.tag, {
                          [s.activeTag]: tagFilters.includes(tag)
                        })}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className={s.contributors}>
                    {contributors.map((user) =>
                      user.company !== '@joyco-studio' ? (
                        <span
                          className={s.contributor}
                          key={user.id}
                          title={user.name}
                        >
                          <Link href={user.url}>
                            <Image
                              width={32}
                              height={32}
                              src={user.avatarUrl}
                              alt="avatar"
                            />
                          </Link>
                        </span>
                      ) : (
                        <span
                          className={s.contributor}
                          key={user.id}
                          title={user.name}
                        >
                          <Link href={'https://github.com/basementstudio'}>
                            <svg
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="18" cy="18" r="18" fill="black" />
                              <path
                                d="M15.86 18.6655C15.86 18.0176 16.396 17.4945 17.06 17.4945H18.96C19.624 17.4945 20.16 18.0176 20.16 18.6655V21.476C20.16 22.1239 19.624 22.647 18.96 22.647H17.06C16.396 22.647 15.86 22.1239 15.86 21.476V18.6655ZM15.736 22.9632C15.736 24.6611 17.148 26 18.888 26H20.8C22.568 26 24 24.6026 24 22.8773V17.2213C24 15.496 22.568 14.0986 20.8 14.0986H18.4C16.992 14.0986 15.852 15.2462 15.84 16.6162V10H12V25.9219H15.736V22.9632Z"
                                fill="#FDFDFD"
                              />
                            </svg>
                          </Link>
                        </span>
                      )
                    )}
                  </div>
                </div>
              </li>
            )
          )}
        </ol>
      </div>
    </>
  )
}

export default ExperimentsSection
