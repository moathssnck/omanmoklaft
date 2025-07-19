import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Car, AlertTriangle, Navigation } from "lucide-react"
import Image from "next/image"

export default function OmanTrafficBlog() {
  const featuredPosts = [
    {
      id: 1,
      title: "New Speed Cameras Installed on Sultan Qaboos Highway",
      excerpt:
        "The Royal Oman Police has announced the installation of 15 new speed cameras along the main highway to improve road safety.",
      image: "/w.jpg",
      category: "Traffic Updates",
      date: "2024-01-15",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "Muscat Traffic Congestion: Peak Hours Analysis",
      excerpt:
        "A comprehensive study of traffic patterns in Muscat reveals the busiest times and alternative routes for commuters.",
      image: "/z.jpg",
      category: "Analysis",
      date: "2024-01-12",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Road Safety Campaign Launches Across Oman",
      excerpt:
        "Ministry of Transport launches nationwide campaign to reduce traffic accidents during the winter season.",
      image: "/rr.jpg",
      category: "Safety",
      date: "2024-01-10",
      readTime: "4 min read",
    },
  ]

  const recentPosts = [
    {
      title: "Salalah-Muscat Highway Maintenance Schedule",
      date: "2024-01-14",
      category: "Infrastructure",
    },
    {
      title: "New Traffic Rules for Heavy Vehicles",
      date: "2024-01-13",
      category: "Regulations",
    },
    {
      title: "Parking Solutions in Muscat City Center",
      date: "2024-01-11",
      category: "Urban Planning",
    },
    {
      title: "Weather Impact on Road Conditions",
      date: "2024-01-09",
      category: "Weather",
    },
  ]

  const categories = [
    { name: "Traffic Updates", count: 24 },
    { name: "Road Safety", count: 18 },
    { name: "Infrastructure", count: 15 },
    { name: "Regulations", count: 12 },
    { name: "Analysis", count: 9 },
    { name: "Weather", count: 7 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Oman Traffic</h1>
                <p className="text-sm text-gray-600">Your source for traffic updates</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Traffic Updates
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Safety
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Infrastructure
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated on Oman's Traffic Conditions</h2>
            <p className="text-xl mb-8 text-red-100">
              Get the latest traffic updates, road safety information, and infrastructure news across the Sultanate of
              Oman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Live Traffic Updates
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                <Navigation className="mr-2 h-5 w-5" />
                Road Conditions Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-red-600" />
                Featured Stories
              </h3>
              <div className="grid gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={500}
                          height={300}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="mr-1 h-4 w-4" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-1 h-4 w-4" />
                              {post.readTime}
                            </div>
                          </div>
                          <CardTitle className="hover:text-red-600 transition-colors cursor-pointer">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="hover:bg-red-50 hover:border-red-600 bg-transparent">
                            Read More
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Stay Informed</CardTitle>
                <CardDescription>
                  Subscribe to our newsletter for daily traffic updates and road safety tips.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Enter your email address" className="flex-1" />
                  <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search traffic updates..." />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex justify-between items-center py-1">
                      <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                        {category.name}
                      </a>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index}>
                      <a href="#" className="block hover:text-red-600 transition-colors">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                          <Separator orientation="vertical" className="mx-2 h-3" />
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </a>
                      {index < recentPosts.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Alert */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Live Traffic Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 mb-3">
                  <strong>Road Closure:</strong> Al Khuwair-Seeb Road partially closed due to maintenance work.
                </p>
                <p className="text-xs text-orange-600">Expected duration: 2 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">Oman Traffic</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted source for traffic updates, road safety information, and transportation news in Oman.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Live Traffic
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Road Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Emergency Contacts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Traffic Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Infrastructure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Regulations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Weather Impact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@omantraffic.om</li>
                <li>Phone: +968 2XXX XXXX</li>
                <li>Emergency: 999</li>
                <li>Traffic Police: 9999</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2024 Oman Traffic Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
