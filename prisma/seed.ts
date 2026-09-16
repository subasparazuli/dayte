import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * QuickStay Development Seed Data
 * ================================
 * ALL DATA IS FOR DEVELOPMENT/DEMO PURPOSES ONLY.
 * Do not represent fictitious businesses as real businesses.
 */

async function main() {
  console.log('🌱 Seeding QuickStay development database...\n');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.fraudEvent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.checkinEvent.deleteMany();
  await prisma.checkinCredential.deleteMany();
  await prisma.review.deleteMany();
  await prisma.paymentEvent.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.pricingRule.deleteMany();
  await prisma.availabilityException.deleteMany();
  await prisma.availabilityRule.deleteMany();
  await prisma.spaceAmenity.deleteMany();
  await prisma.spacePhoto.deleteMany();
  await prisma.space.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyPhoto.deleteMany();
  await prisma.property.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.host.deleteMany();
  await prisma.otpAttempt.deleteMany();
  await prisma.session.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.report.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // ============================================================
  // AMENITIES
  // ============================================================
  console.log('  Creating amenities...');
  await prisma.amenity.deleteMany();

  const amenities = await Promise.all([
    prisma.amenity.create({ data: { name: 'WiFi', icon: 'wifi', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'Air Conditioning', icon: 'snowflake', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'Hot Water', icon: 'droplets', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'TV', icon: 'tv', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'Parking', icon: 'car', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'Room Service', icon: 'utensils', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'CCTV (Common Areas)', icon: 'camera', category: 'SAFETY' } }),
    prisma.amenity.create({ data: { name: 'Power Backup', icon: 'zap', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'Clean Linens', icon: 'bed-double', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'Towels', icon: 'bath', category: 'BASIC' } }),
    prisma.amenity.create({ data: { name: 'Elevator', icon: 'arrow-up-down', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'Mini Fridge', icon: 'refrigerator', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'Desk / Workspace', icon: 'laptop', category: 'TECH' } }),
    prisma.amenity.create({ data: { name: 'Electric Kettle', icon: 'coffee', category: 'COMFORT' } }),
    prisma.amenity.create({ data: { name: 'Attached Bathroom', icon: 'shower-head', category: 'BASIC' } }),
  ]);

  const amenityMap = Object.fromEntries(amenities.map(a => [a.name, a.id]));

  // ============================================================
  // USERS
  // ============================================================
  console.log('  Creating users...');

  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      phone: '+9779800000001',
      email: 'admin@quickstay.test',
      role: 'ADMIN',
      isAdult: true,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'QuickStay',
          displayName: 'Admin',
        },
      },
    },
  });

  // Host users
  const host1User = await prisma.user.create({
    data: {
      phone: '+9779800000002',
      email: 'host1@quickstay.test',
      role: 'HOST',
      isAdult: true,
      profile: {
        create: {
          firstName: 'Rajesh',
          lastName: 'Shrestha',
          displayName: 'Rajesh S.',
        },
      },
    },
  });

  const host2User = await prisma.user.create({
    data: {
      phone: '+9779800000003',
      email: 'host2@quickstay.test',
      role: 'HOST',
      isAdult: true,
      profile: {
        create: {
          firstName: 'Sunita',
          lastName: 'Maharjan',
          displayName: 'Sunita M.',
        },
      },
    },
  });

  const host3User = await prisma.user.create({
    data: {
      phone: '+9779800000004',
      email: 'host3@quickstay.test',
      role: 'HOST',
      isAdult: true,
      profile: {
        create: {
          firstName: 'Bikram',
          lastName: 'Thapa',
          displayName: 'Bikram T.',
        },
      },
    },
  });

  // Guest user
  const guestUser = await prisma.user.create({
    data: {
      phone: '+9779800000005',
      email: 'guest@quickstay.test',
      role: 'GUEST',
      isAdult: true,
      profile: {
        create: {
          firstName: 'Anita',
          lastName: 'Gurung',
          displayName: 'Anita G.',
        },
      },
    },
  });

  // ============================================================
  // HOSTS
  // ============================================================
  console.log('  Creating hosts...');

  const host1 = await prisma.host.create({
    data: {
      userId: host1User.id,
      businessName: 'Thamel Comfort Stays (DEMO)',
      businessType: 'HOTEL',
      verificationStatus: 'VERIFIED',
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
      emergencyContact: '+9779800000002',
    },
  });

  const host2 = await prisma.host.create({
    data: {
      userId: host2User.id,
      businessName: 'Patan Heritage Rooms (DEMO)',
      businessType: 'GUESTHOUSE',
      verificationStatus: 'VERIFIED',
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
      emergencyContact: '+9779800000003',
    },
  });

  const host3 = await prisma.host.create({
    data: {
      userId: host3User.id,
      businessName: 'Bikram Properties (DEMO)',
      businessType: 'INDIVIDUAL',
      verificationStatus: 'VERIFIED',
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
      emergencyContact: '+9779800000004',
    },
  });

  // ============================================================
  // PROPERTIES — Kathmandu Valley locations
  // ============================================================
  console.log('  Creating properties...');

  const properties = [
    {
      hostId: host1.id,
      name: 'Hotel Mountain View (DEMO)',
      slug: 'hotel-mountain-view-demo',
      propertyType: 'HOTEL',
      description: 'DEMO PROPERTY — A comfortable hotel in the heart of Thamel with mountain views, modern amenities, and 24/7 front desk. Perfect for travelers and quick stays.',
      address: 'Thamel Marg, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.7157,
      longitude: 85.3123,
      locationPrivacy: 'PUBLIC_APPROXIMATE',
      checkInPolicy: 'Self check-in available 24/7. PIN code will be provided after booking confirmation.',
      houseRules: 'No smoking indoors. Quiet hours after 10 PM. Valid ID required at check-in.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'CCTV (Common Areas)', 'Power Backup', 'Clean Linens', 'Elevator'],
      spaces: [
        {
          name: 'Standard Room',
          slug: 'standard-room',
          spaceType: 'HOTEL_ROOM',
          description: 'Cozy standard room with queen bed, attached bathroom, and city view.',
          capacity: 2,
          pricePerHour: 50000, // Rs. 500/hr in paisa
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Clean Linens', 'Towels', 'Attached Bathroom'],
        },
        {
          name: 'Deluxe Room',
          slug: 'deluxe-room',
          spaceType: 'HOTEL_ROOM',
          description: 'Spacious deluxe room with king bed, mountain view, mini fridge, and work desk.',
          capacity: 2,
          pricePerHour: 80000, // Rs. 800/hr in paisa
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Clean Linens', 'Towels', 'Attached Bathroom', 'Mini Fridge', 'Desk / Workspace'],
        },
      ],
    },
    {
      hostId: host1.id,
      name: 'Thamel City Lodge (DEMO)',
      slug: 'thamel-city-lodge-demo',
      propertyType: 'GUESTHOUSE',
      description: 'DEMO PROPERTY — Budget-friendly guesthouse in the bustling Thamel area. Walking distance to restaurants, shops, and tourist attractions.',
      address: 'JP Road, Thamel, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.7142,
      longitude: 85.3109,
      locationPrivacy: 'PUBLIC_APPROXIMATE',
      checkInPolicy: 'Self check-in with lockbox code.',
      houseRules: 'Respectful conduct required. No loud music.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Hot Water', 'Power Backup', 'Clean Linens'],
      spaces: [
        {
          name: 'Single Room',
          slug: 'single-room',
          spaceType: 'GUEST_ROOM',
          description: 'Compact single room ideal for solo travelers. Clean and comfortable.',
          capacity: 1,
          pricePerHour: 30000, // Rs. 300/hr
          amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Towels'],
        },
        {
          name: 'Double Room',
          slug: 'double-room',
          spaceType: 'GUEST_ROOM',
          description: 'Comfortable double room with twin beds and natural light.',
          capacity: 2,
          pricePerHour: 45000, // Rs. 450/hr
          amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Towels', 'TV'],
        },
      ],
    },
    {
      hostId: host2.id,
      name: 'Patan Heritage Stay (DEMO)',
      slug: 'patan-heritage-stay-demo',
      propertyType: 'GUESTHOUSE',
      description: 'DEMO PROPERTY — Charming heritage-style guesthouse near Patan Durbar Square. Experience traditional Newari architecture with modern comforts.',
      address: 'Near Patan Durbar Square, Lalitpur (DEMO ADDRESS)',
      city: 'Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      latitude: 27.6725,
      longitude: 85.3254,
      locationPrivacy: 'PUBLIC_APPROXIMATE',
      checkInPolicy: 'Host will provide instructions after booking.',
      houseRules: 'Remove shoes inside. Respect heritage architecture.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Hot Water', 'Power Backup', 'Clean Linens', 'Parking'],
      spaces: [
        {
          name: 'Heritage Room',
          slug: 'heritage-room',
          spaceType: 'PRIVATE_ROOM',
          description: 'Beautiful room with traditional Newari wood carvings and modern amenities.',
          capacity: 2,
          pricePerHour: 60000, // Rs. 600/hr
          amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Towels', 'Electric Kettle'],
        },
      ],
    },
    {
      hostId: host2.id,
      name: 'Jawalakhel Urban Suites (DEMO)',
      slug: 'jawalakhel-urban-suites-demo',
      propertyType: 'APARTMENT',
      description: 'DEMO PROPERTY — Modern serviced apartments in Jawalakhel with fully furnished spaces. Ideal for business travelers and extended stays.',
      address: 'Jawalakhel, Lalitpur (DEMO ADDRESS)',
      city: 'Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      latitude: 27.6684,
      longitude: 85.3160,
      locationPrivacy: 'HIDDEN_UNTIL_BOOKED',
      checkInPolicy: 'Self check-in with smart lock PIN.',
      houseRules: 'No parties. Keep common areas clean.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Parking', 'Power Backup', 'Elevator'],
      spaces: [
        {
          name: 'Studio Apartment',
          slug: 'studio-apartment',
          spaceType: 'STUDIO',
          description: 'Fully furnished studio with kitchenette, workspace, and city views.',
          capacity: 2,
          pricePerHour: 100000, // Rs. 1000/hr
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Mini Fridge', 'Desk / Workspace', 'Electric Kettle', 'Attached Bathroom'],
        },
        {
          name: 'One Bedroom Suite',
          slug: 'one-bedroom-suite',
          spaceType: 'APARTMENT',
          description: 'Spacious one-bedroom apartment with separate living area and full kitchen.',
          capacity: 3,
          pricePerHour: 150000, // Rs. 1500/hr
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Mini Fridge', 'Desk / Workspace', 'Electric Kettle', 'Attached Bathroom'],
        },
      ],
    },
    {
      hostId: host3.id,
      name: 'Lazimpat Garden Hotel (DEMO)',
      slug: 'lazimpat-garden-hotel-demo',
      propertyType: 'HOTEL',
      description: 'DEMO PROPERTY — Peaceful hotel in the embassy district of Lazimpat. Beautiful garden setting with modern rooms.',
      address: 'Lazimpat, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.7207,
      longitude: 85.3225,
      locationPrivacy: 'PUBLIC_EXACT',
      checkInPolicy: 'Reception open 6 AM - 10 PM. Self check-in available after hours.',
      houseRules: 'No smoking. Pets not allowed. Quiet hours 10 PM - 6 AM.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Parking', 'Room Service', 'CCTV (Common Areas)', 'Power Backup', 'Elevator'],
      spaces: [
        {
          name: 'Garden View Room',
          slug: 'garden-view-room',
          spaceType: 'HOTEL_ROOM',
          description: 'Serene room overlooking the garden with premium bedding and modern bath.',
          capacity: 2,
          pricePerHour: 70000, // Rs. 700/hr
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Clean Linens', 'Towels', 'Attached Bathroom', 'Mini Fridge'],
        },
      ],
    },
    {
      hostId: host3.id,
      name: 'Baneshwor Business Hub (DEMO)',
      slug: 'baneshwor-business-hub-demo',
      propertyType: 'OTHER',
      description: 'DEMO PROPERTY — Professional meeting rooms and rest spaces in the Baneshwor business district. Ideal for meetings, work sessions, and transit rest.',
      address: 'New Baneshwor, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.6915,
      longitude: 85.3420,
      locationPrivacy: 'PUBLIC_EXACT',
      checkInPolicy: 'Self check-in with QR code.',
      houseRules: 'Professional conduct expected. Clean up after use.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Air Conditioning', 'Power Backup', 'Elevator', 'Parking'],
      spaces: [
        {
          name: 'Meeting Room A',
          slug: 'meeting-room-a',
          spaceType: 'MEETING_ROOM',
          description: 'Professional meeting room for up to 6 people with whiteboard and projector.',
          capacity: 6,
          pricePerHour: 40000, // Rs. 400/hr
          amenities: ['WiFi', 'Air Conditioning', 'Desk / Workspace'],
          checkinMethod: 'QR',
        },
        {
          name: 'Rest Pod',
          slug: 'rest-pod',
          spaceType: 'REST_ROOM',
          description: 'Private rest space with recliner and privacy curtains. Perfect for transit rest.',
          capacity: 1,
          pricePerHour: 25000, // Rs. 250/hr
          amenities: ['WiFi', 'Air Conditioning'],
        },
      ],
    },
    {
      hostId: host3.id,
      name: 'Baluwatar Residency (DEMO)',
      slug: 'baluwatar-residency-demo',
      propertyType: 'PRIVATE_ROOM',
      description: 'DEMO PROPERTY — Quiet private room in the residential Baluwatar area. Close to embassies and parks.',
      address: 'Baluwatar, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.7265,
      longitude: 85.3290,
      locationPrivacy: 'HIDDEN_UNTIL_BOOKED',
      checkInPolicy: 'PIN code provided 30 minutes before check-in.',
      houseRules: 'No shoes inside. No visitors without prior approval.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Hot Water', 'Parking', 'Power Backup'],
      spaces: [
        {
          name: 'Private Suite',
          slug: 'private-suite',
          spaceType: 'PRIVATE_ROOM',
          description: 'Elegant private room with ensuite bathroom, sitting area, and garden access.',
          capacity: 2,
          pricePerHour: 55000, // Rs. 550/hr
          amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Towels', 'Attached Bathroom', 'Electric Kettle'],
        },
      ],
    },
    {
      hostId: host1.id,
      name: 'Airport Transit Inn (DEMO)',
      slug: 'airport-transit-inn-demo',
      propertyType: 'HOTEL',
      description: 'DEMO PROPERTY — Convenient transit hotel near Tribhuvan International Airport. Perfect for layovers, early flights, and late arrivals.',
      address: 'Near TIA, Sinamangal, Kathmandu (DEMO ADDRESS)',
      city: 'Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      latitude: 27.6967,
      longitude: 85.3592,
      locationPrivacy: 'PUBLIC_EXACT',
      checkInPolicy: '24/7 self check-in available.',
      houseRules: 'Quiet property. Luggage storage available.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Parking', 'CCTV (Common Areas)', 'Power Backup'],
      spaces: [
        {
          name: 'Transit Room',
          slug: 'transit-room',
          spaceType: 'HOTEL_ROOM',
          description: 'Clean transit room with comfortable bed, hot shower, and luggage storage.',
          capacity: 2,
          pricePerHour: 45000, // Rs. 450/hr
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'Clean Linens', 'Towels', 'Attached Bathroom'],
        },
        {
          name: 'Premium Transit Suite',
          slug: 'premium-transit-suite',
          spaceType: 'HOTEL_ROOM',
          description: 'Spacious transit suite with workspace, mini fridge, and airport shuttle coordination.',
          capacity: 2,
          pricePerHour: 75000, // Rs. 750/hr
          amenities: ['WiFi', 'Air Conditioning', 'Hot Water', 'TV', 'Clean Linens', 'Towels', 'Attached Bathroom', 'Mini Fridge', 'Desk / Workspace'],
        },
      ],
    },
    {
      hostId: host2.id,
      name: 'Bhaktapur Heritage House (DEMO)',
      slug: 'bhaktapur-heritage-house-demo',
      propertyType: 'GUESTHOUSE',
      description: 'DEMO PROPERTY — Traditional Newari house in the ancient city of Bhaktapur. Experience authentic heritage living with modern comforts.',
      address: 'Near Bhaktapur Durbar Square, Bhaktapur (DEMO ADDRESS)',
      city: 'Bhaktapur',
      district: 'Bhaktapur',
      province: 'Bagmati',
      latitude: 27.6722,
      longitude: 85.4279,
      locationPrivacy: 'PUBLIC_APPROXIMATE',
      checkInPolicy: 'Host will greet you at the entrance.',
      houseRules: 'Remove shoes inside. Photography of interiors with permission.',
      approvalStatus: 'APPROVED',
      isDemoData: true,
      amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Power Backup'],
      spaces: [
        {
          name: 'Heritage Room',
          slug: 'heritage-room',
          spaceType: 'GUEST_ROOM',
          description: 'Authentic Newari room with traditional woodwork, courtyard view, and modern bathroom.',
          capacity: 2,
          pricePerHour: 50000, // Rs. 500/hr
          amenities: ['WiFi', 'Hot Water', 'Clean Linens', 'Towels', 'Attached Bathroom'],
          checkinMethod: 'INSTRUCTIONS',
        },
      ],
    },
  ];

  for (const prop of properties) {
    const { amenities: propAmenities, spaces, ...propertyData } = prop;

    const property = await prisma.property.create({
      data: {
        ...propertyData,
        approvedAt: new Date(),
      },
    });

    // Link property amenities
    for (const amenityName of propAmenities) {
      if (amenityMap[amenityName]) {
        await prisma.propertyAmenity.create({
          data: {
            propertyId: property.id,
            amenityId: amenityMap[amenityName],
          },
        });
      }
    }

    // Create spaces
    for (const space of spaces) {
      const { amenities: spaceAmenities, pricePerHour, checkinMethod, ...spaceData } = space;

      const createdSpace = await prisma.space.create({
        data: {
          ...spaceData,
          propertyId: property.id,
          checkinMethod: checkinMethod || 'PIN',
        },
      });

      // Create standard pricing rule
      await prisma.pricingRule.create({
        data: {
          spaceId: createdSpace.id,
          name: 'Standard Rate',
          ruleType: 'STANDARD',
          pricePerHour: pricePerHour,
          priority: 0,
        },
      });

      // Create weekend pricing (20% higher)
      await prisma.pricingRule.create({
        data: {
          spaceId: createdSpace.id,
          name: 'Weekend Rate',
          ruleType: 'WEEKEND',
          pricePerHour: Math.round(pricePerHour * 1.2),
          dayOfWeek: '0,6', // Sunday, Saturday
          priority: 1,
        },
      });

      // Create availability rules (every day, 6 AM to midnight)
      for (let day = 0; day < 7; day++) {
        await prisma.availabilityRule.create({
          data: {
            spaceId: createdSpace.id,
            dayOfWeek: day,
            startTime: '06:00',
            endTime: '23:59',
          },
        });
      }

      // Link space amenities
      for (const amenityName of spaceAmenities) {
        if (amenityMap[amenityName]) {
          await prisma.spaceAmenity.create({
            data: {
              spaceId: createdSpace.id,
              amenityId: amenityMap[amenityName],
            },
          });
        }
      }
    }

    console.log(`  ✓ Created: ${property.name}`);
  }

  // ============================================================
  // PLATFORM SETTINGS
  // ============================================================
  console.log('\n  Creating platform settings...');

  const settings = [
    { key: 'platform_fee_percent', value: '10', type: 'NUMBER', category: 'PRICING' },
    { key: 'service_fee_percent', value: '5', type: 'NUMBER', category: 'PRICING' },
    { key: 'tax_rate_percent', value: '13', type: 'NUMBER', category: 'PRICING' },
    { key: 'min_booking_duration_hours', value: '1', type: 'NUMBER', category: 'BOOKING' },
    { key: 'max_booking_duration_hours', value: '24', type: 'NUMBER', category: 'BOOKING' },
    { key: 'booking_hold_minutes', value: '10', type: 'NUMBER', category: 'BOOKING' },
    { key: 'cancellation_window_hours', value: '2', type: 'NUMBER', category: 'BOOKING' },
    { key: 'guest_min_age', value: '18', type: 'NUMBER', category: 'GENERAL' },
    { key: 'listing_approval_required', value: 'true', type: 'BOOLEAN', category: 'GENERAL' },
    { key: 'host_approval_required', value: 'true', type: 'BOOLEAN', category: 'GENERAL' },
    { key: 'review_window_days', value: '14', type: 'NUMBER', category: 'GENERAL' },
  ];

  for (const setting of settings) {
    await prisma.setting.create({ data: setting });
  }

  console.log('\n✅ Seed completed successfully!');
  console.log('\n📋 Test accounts:');
  console.log('  Admin:  admin@quickstay.test / +9779800000001');
  console.log('  Host 1: host1@quickstay.test / +9779800000002');
  console.log('  Host 2: host2@quickstay.test / +9779800000003');
  console.log('  Host 3: host3@quickstay.test / +9779800000004');
  console.log('  Guest:  guest@quickstay.test / +9779800000005');
  console.log('\n⚠️  ALL DATA IS FOR DEVELOPMENT/DEMO PURPOSES ONLY.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
