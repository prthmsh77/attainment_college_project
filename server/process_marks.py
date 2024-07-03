import pandas as pd

def process_marks(input_file):
    df = pd.read_excel(input_file)

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

    def calculate_statistics(column, total):
        percentage = (df[column] / total) * 100
        students_below_51 = len(df[percentage < 51])
        students_51_60 = len(df[(percentage >= 51) & (percentage < 61)])
        students_61_70 = len(df[(percentage >= 61) & (percentage < 71)])
        students_above_71 = len(df[percentage >= 71])
        print(column)
        print(percentage)
        print("-------------------------------")
        return students_below_51, students_51_60, students_61_70, students_above_71

    results = {}
    columns_and_totals = {
        'CO1_UT': 15, 'CO2_UT': 15, 'CO3_UT': 15, 'CO4_UT': 15, 
        'CO3_P': 17.5, 'CO4_P': 17.5, 'CO5_P': 17.5, 'CO6_P': 17.5, 
        'CO1_I': 15, 'CO2_I': 15, 'CO3_E': 17.5, 'CO4_E': 17.5, 'CO5_E': 17.5, 'CO6_E': 17.5 
    }

    for column, total in columns_and_totals.items():
        if column in df.columns:
            print(column+":")
            print(calculate_statistics(column, total))
            results[column] = calculate_statistics(column, total)

    total_students = len(df)
    attainment = {}

    for column in columns_and_totals:
        if column in results:
            attainment[column] = ((0 * results[column][0]) + (1 * results[column][1]) + (2 * results[column][2]) + (3 * results[column][3])) / total_students
        else:
            attainment[column] = None
    print(df)
    return {
        "CO1_UT": attainment['CO1_UT'],
        "CO2_UT": attainment['CO2_UT'],
        "CO3_UT": attainment['CO3_UT'],
        "CO4_UT": attainment['CO4_UT'],
        "CO3_P": attainment['CO3_P'],
        "CO4_P": attainment['CO4_P'],
        "CO5_P": attainment['CO5_P'],
        "CO6_P": attainment['CO6_P'],
        "CO1_I": attainment['CO1_I'],
        "CO2_I": attainment['CO2_I'],
        "CO3_E": attainment['CO3_E'],
        "CO4_E": attainment['CO4_E'],
        "CO5_E": attainment['CO5_E'],
        "CO6_E": attainment['CO6_E']
    }

# # Example usage
# input_file = 'input.xlsx'
# output_file = 'output_marks.xlsx'
# result = process_marks(input_file, output_file)
# print(result)
