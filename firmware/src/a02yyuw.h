void initDistance()
{
}

float readDistance()
{
    Serial.println("Reading distance...");
    unsigned char data[4] = {};
    float distance = -1;
    int count = 0;
    while (distance < 0 && count++ < 1000)
    {
        do
        {
            for (int i = 0; i < 4; i++)
            {
                data[i] = Serial1.read();
            }
        } while (Serial1.read() == 0xff);

        Serial1.flush();

        if (data[0] == 0xff)
        {
            int sum = (data[0] + data[1] + data[2]) & 0x00FF;

            if (sum == data[3])
            {
                distance = (data[1] << 8) + data[2];
                if (distance < 30)
                {
                    Serial.println("Distance too short");
                    distance = -1;
                }
            }
        }
        delay(100);
    }

    Serial.printlnf("Distance: %.0fmm", distance);
    return distance;
}
