'use client'
export default function SearchBar() {
    return (
        <div className="mr-8">
            <label className="input rounded-full bg-white">
                <svg className="h-[1em] text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow text-[#666666] placeholder:text-[#666666]" placeholder="Search" />
            </label>
        </div>
    )
}