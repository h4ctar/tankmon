#include "Particle.h"

// Let Device OS manage the connection to the Particle Cloud
SYSTEM_MODE(AUTOMATIC);

// Run the application and system concurrently in separate threads
SYSTEM_THREAD(ENABLED);

// Show system, cloud connectivity, and application logs over USB
// View logs with CLI using 'particle serial monitor --follow'
SerialLogHandler logHandler(LOG_LEVEL_INFO);

void setup()
{
    Serial1.begin(9600);
}

float readDistance()
{
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
                    distance = -1;
                }
            }
        }
        delay(100);
    }

    return distance;
}

void loop()
{
    CellularSignal signal = Cellular.RSSI();
    float signalStrength = signal.getStrength();
    float signalQuality = signal.getQuality();

    FuelGauge fuel;
    float batteryCharge = System.batteryCharge();

    float distance = readDistance();

    char data[100];
    sprintf(data, "%.2f,%.2f,%.2f,%.2f", distance, batteryCharge, signalStrength, signalQuality);
    Particle.publish("status", data, PRIVATE);

    // System.sleep(SLEEP_MODE_SOFTPOWEROFF, 10 * 60);
    delay(30 * 1000);
}
