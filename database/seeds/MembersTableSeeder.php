<?php

use App\Member;
use Faker\Factory;
use Illuminate\Database\Seeder;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for ($i =0; $i < 1000; $i++) {
            $gender = $faker->randomElement(['male', 'female'])[0];
            Member::create([
                'firstname' => $faker->firstName($gender),
                'surname' => $faker->lastName,
                'email' => $faker->email,
                'gender' => $gender === 'm' ? 'Male' : 'Female',
                'created_at' => $faker->dateTime(),
            ]);
        }
    }
}
