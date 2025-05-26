import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, User, Trophy, Sparkles, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import './SlotBookingForm.css';


const venues = ['Sport Arena', 'City Gym', 'PlayZone'];

function SlotBookingForm() {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [userName, setUserName] = useState('');
  const [sport, setSport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Polling effect for real-time slot updates
  useEffect(() => {
    let intervalId;

    const fetchSlots = () => {
      if (selectedVenue && selectedDate) {
        setIsLoading(true);

        setTimeout(() => {
          let mockSlots = [
            '09:00 AM - 10:00 AM',
            '10:00 AM - 11:00 AM',
            '11:00 AM - 12:00 PM',
            '02:00 PM - 03:00 PM',
            '03:00 PM - 04:00 PM',
            '04:00 PM - 05:00 PM',
            '06:00 PM - 07:00 PM',
            '07:00 PM - 08:00 PM'
          ];

          // Randomly remove one slot
          if (Math.random() < 0.3 && mockSlots.length > 1) {
            mockSlots.splice(Math.floor(Math.random() * mockSlots.length), 1);
          }

          setSlots(mockSlots);
          setIsLoading(false);
        }, 800);
      } else {
        setSlots([]);
      }
    };

    fetchSlots(); // Initial fetch

    if (selectedVenue && selectedDate && !showConfirmation) {
      intervalId = setInterval(fetchSlots, 5000); // Poll every 5 seconds
    }

    return () => clearInterval(intervalId); // Cleanup
  }, [selectedVenue, selectedDate, showConfirmation]);

  const handleSubmit = () => {
    if (!userName || !sport || !selectedVenue || !selectedDate || !selectedSlot) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const booking = {
        id: `BK${Date.now()}`,  // Fixed template literal here
        name: userName,
        sport: sport,
        venue: selectedVenue,
        date: selectedDate,
        slot: selectedSlot,
        bookedAt: new Date().toLocaleString()
      };
      
      setBookingDetails(booking);
      setIsLoading(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const handleNewBooking = () => {
    setShowConfirmation(false);
    setBookingDetails(null);
    setUserName('');
    setSport('');
    setSelectedVenue('');
    setSelectedDate('');
    setSelectedSlot('');
    setSlots([]);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4 flex items-center justify-center relative overflow-hidden">
        {/* Geometric background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-cyan-400/30 rotate-12"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 border border-emerald-400/20 -rotate-12"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border border-blue-400/25 rotate-45"></div>
          </div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              SUCCESS!
            </h1>
            <p className="text-xl text-gray-300 font-light">Your booking is confirmed and ready to go</p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10 mb-8 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500 to-emerald-500"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <h2 className="text-3xl font-bold text-white">Booking Confirmation</h2>
                <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full border border-emerald-400/30">
                  <span className="text-emerald-300 font-semibold text-sm">CONFIRMED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm font-medium">PLAYER</p>
                          <p className="text-white font-bold text-xl">{bookingDetails?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm font-medium">SPORT</p>
                          <p className="text-white font-bold text-xl">{bookingDetails?.sport}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm font-medium">VENUE</p>
                          <p className="text-white font-bold text-xl">{bookingDetails?.venue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm font-medium">DATE</p>
                          <p className="text-white font-bold text-lg">{new Date(bookingDetails?.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-2xl border border-cyan-400/20">
                    <div className="flex items-center mb-4">
                      <Clock className="w-8 h-8 text-cyan-400 mr-4" />
                      <div>
                        <p className="text-gray-400 text-sm font-medium">TIME SLOT</p>
                        <p className="text-white font-bold text-2xl">{bookingDetails?.slot}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20">
                    <p className="text-gray-400 text-sm font-medium mb-2">BOOKING ID</p>
                    <div className="flex items-center justify-between">
                      <p className="text-purple-300 font-mono font-bold text-xl">{bookingDetails?.id}</p>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-400 text-xs font-medium mb-1">CONFIRMED ON</p>
                    <p className="text-white font-semibold text-sm">{bookingDetails?.bookedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleNewBooking}
              className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center border border-slate-600/50"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Book Another Session
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Download Confirmation
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-lg font-medium mb-2">🎯 Ready to dominate the game!</p>
            <p className="text-gray-500 text-sm">Arrive 15 minutes early • Bring your A-game • Have fun!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-cyan-400/30 rotate-12"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-emerald-400/20 -rotate-12"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-blue-400/25 rotate-45"></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-900" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            BOOK NOW
          </h1>
          <p className="text-xl text-gray-300 font-light">Secure your spot and play like a champion</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10 space-y-8 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500 to-emerald-500"></div>
          </div>
          
          <div className="relative z-10 space-y-8">
            {/* Name */}
            <div className="group">
              <label className="flex items-center text-white font-semibold mb-4 text-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-white" />
                </div>
                Your Name
              </label>
              <input
                type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                placeholder="Enter your full name"
              />
            </div>

            {/* Sport */}
            {/* Games Selection */}
<div className="group">
  <label className="flex items-center text-white font-semibold mb-4 text-lg">
    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
      <Star className="w-4 h-4 text-white" />
    </div>
    Choose Your Game
  </label>
  <div className="grid grid-cols-2 gap-4 text-white">
    {['Football', 'Basketball', 'Tennis', 'Badminton', 'Volleyball'].map((game) => (
      <label key={game} className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          name="game"
          value={game}
          checked={sport === game}
          onChange={(e) => setSport(e.target.value)}
          className="accent-cyan-500 w-5 h-5"
        />
        <span>{game}</span>
      </label>
    ))}
  </div>
</div>

            {/* Venue */}
            <div className="group">
              <label className="flex items-center text-white font-semibold mb-4 text-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                Venue
              </label>
              <select
                value={selectedVenue} onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                <option value="">Choose your venue</option>
                {venues.map((venue, idx) => (
                  <option key={idx} value={venue} className="bg-gray-800 text-white">{venue}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="group">
              <label className="flex items-center text-white font-semibold mb-4 text-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                Date
              </label>
              <input
                type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              />
            </div>

            {/* Slots */}
            <div className="group">
              <label className="flex items-center text-white font-semibold mb-4 text-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                Time Slot
              </label>
              <select
                value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} disabled={!slots.length && !isLoading}
                className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer disabled:opacity-50 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                <option value="">{isLoading ? 'Loading available slots...' : 'Select your time slot'}</option>
                {slots.map((slot, idx) => (
                  <option key={idx} value={slot} className="bg-gray-800 text-white">{slot}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit} disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center text-lg mt-8"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Securing Your Slot...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  SECURE MY SLOT
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-lg font-medium">🏆 Join the game. Make your mark.</p>
        </div>
      </div>
    </div>
  );
}

export default SlotBookingForm;

