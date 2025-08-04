export default function About() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start px-4 py-12'>
      <div className='max-w-2xl w-full text-center'>
        <h1 className='text-3xl font-semibold my-7'>About SinghBlogs</h1>
        <div className='text-md text-gray-600 flex flex-col gap-6'>
          <p>
            Welcome to SinghBlogs, a thriving community of avid readers,
            writers, and bibliophiles. Our blog is a vibrant space where we
            celebrate the power of words and the transformative impact of
            literature on our lives.
          </p>
          <p>
            Here, we delve into the depths of captivating narratives,
            exploring the intricate worlds crafted by talented authors. From
            thought-provoking fiction to insightful non-fiction, our blog
            covers a diverse range of genres and topics, catering to every
            literary taste.
          </p>
          <p>
            What sets us apart is our commitment to fostering a community of
            passionate readers and writers. We encourage open discussions,
            respectful debates, and the sharing of personal experiences
            related to the books we explore. Our goal is to create a
            welcoming space where ideas flourish and the love for literature
            knows no bounds.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className='max-w-2xl w-full text-center mt-12 border-t pt-6'>
        <h2 className='text-2xl font-medium mb-4'>Contact</h2>
        <p className='text-gray-600'>Shivam Singh</p>
        <p className='text-gray-600'>Phone: 7457951789</p>
        <p className='text-gray-600'>Location: Kanpur, Uttar Pradesh</p>
      </div>
    </div>
  );
}
