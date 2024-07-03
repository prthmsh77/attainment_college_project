import pandas as pd

def process_marks(input_file):
    df = pd.read_excel(input_file)

    # Calculate split scores for different columns
    if 'UT1' in df.columns:
        df[['CO1_UT', 'CO2_UT']] = df['UT1'].apply(lambda x: pd.Series([x / 2, x / 2]))

    if 'UT2' in df.columns:
        df[['CO3_UT', 'CO4_UT']] = df['UT2'].apply(lambda x: pd.Series([x / 2, x / 2]))

    if 'Prelim' in df.columns:
        df[['CO3_P', 'CO4_P', 'CO5_P', 'CO6_P']] = df['Prelim'].apply(lambda x: pd.Series([x / 4, x / 4, x / 4, x / 4]))

    if 'Insem' in df.columns:
        df[['CO1_I', 'CO2_I']] = df['Insem'].apply(lambda x: pd.Series([x / 2, x / 2]))

    if 'Endsem' in df.columns:
        df[['CO3_E', 'CO4_E', 'CO5_E', 'CO6_E']] = df['Endsem'].apply(lambda x: pd.Series([x / 4, x / 4, x / 4, x / 4]))

    # Function to calculate statistics
    def calculate_statistics(column, total):
        percentage = (df[column] / total) * 100
        students_below_51 = len(df[percentage < 51])
        students_51_60 = len(df[(percentage >= 51) & (percentage < 61)])
        students_61_70 = len(df[(percentage >= 61) & (percentage < 71)])
        students_above_71 = len(df[percentage >= 71])
        return {
            "percentage": percentage.tolist(),
            "students_below_51": students_below_51,
            "students_51_60": students_51_60,
            "students_61_70": students_61_70,
            "students_above_71": students_above_71
        }

    # Initialize results and totals
    results = {}
    columns_and_totals = {
        'CO1_UT': 15, 'CO2_UT': 15, 'CO3_UT': 15, 'CO4_UT': 15,
        'CO3_P': 17.5, 'CO4_P': 17.5, 'CO5_P': 17.5, 'CO6_P': 17.5,
        'CO1_I': 15, 'CO2_I': 15, 'CO3_E': 17.5, 'CO4_E': 17.5, 'CO5_E': 17.5, 'CO6_E': 17.5
    }

    # Calculate statistics for each column
    for column, total in columns_and_totals.items():
        if column in df.columns:
            results[column] = calculate_statistics(column, total)

    # Calculate attainment
    total_students = len(df)
    attainment = {}

    for column in columns_and_totals:
        if column in results:
            attainment[column] = ((0 * results[column]['students_below_51']) +
                                  (1 * results[column]['students_51_60']) +
                                  (2 * results[column]['students_61_70']) +
                                  (3 * results[column]['students_above_71'])) / total_students
        else:
            attainment[column] = None

    # Prepare JSON-compatible results
    json_results = {
        "attainment": attainment,
        "results": results
    }

    return df, json_results
