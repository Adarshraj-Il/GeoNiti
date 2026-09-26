export default function Footer() {
  return (
    <footer className="mt-16 bg-[#0b2e4a] text-[#dfe7ef]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-white">Geoniti</p>
          <ul className="mt-4 space-y-2 text-sm text-[#dfe7ef]/90">
            <li>Ministry of Rural Development</li>
            <li>Krishi Bhawan, New Delhi - 110001</li>
            <li>land-support@nic.in</li>
            <li>1800-111-222 (Toll Free)</li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-semibold text-gold">Important Links</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors hover:text-gold">National Informatics Centre (NIC)</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Digital India Programme</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Right to Information (RTI)</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Ministry of Rural Development</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-semibold text-gold">Quick Access</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors hover:text-gold">District Collector Login</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Public Grievance Portal</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">e-Compensation Status</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Download Forms</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-semibold text-gold">Policies</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors hover:text-gold">Terms of Use</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Privacy Policy</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Accessibility Statement</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Copyright Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#2c4b62] px-6 py-4 text-center text-[0.85rem] text-[#8faec9]">
        <p>© 2026 Geoniti — Real-Time National Land Acquisition &amp; Management System | Built for Smart India Hackathon (SIH)</p>
        <p className="mt-1">All processes digitized · Prototype build, seed data for demonstration</p>
      </div>
    </footer>
  );
}
